const pdfParse = require("pdf-parse")
const { generateInterviewReport, generateResumePdf } = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")
const {
    reserveAnalysisUsage,
    completeAnalysisUsage,
    failAnalysisUsage,
    generateRequestId,
    serializeReportForUser,
    getFreeUsageStatus,
    isActivePro,
} = require("../services/entitlement.service")
const userModel = require("../models/user.model")

/**
 * @description Controller to generate interview report based on user self description, resume and job description.
 */
async function generateInterViewReportController(req, res, next) {
    const requestId = generateRequestId(req.user.id)

    try {
        if (!req.file && !req.body.selfDescription) {
            return res.status(400).json({ success: false, message: "Either a resume file or self description is required" })
        }

        let resumeText = ""
        if (req.file) {
            try {
                const resumeContent = await pdfParse(req.file.buffer)
                resumeText = resumeContent.text
            } catch {
                return res.status(400).json({
                    success: false,
                    message: "Failed to parse the resume file. Please ensure it is a valid PDF."
                })
            }
        }

        const { selfDescription, jobDescription, companyName } = req.body

        if (!jobDescription) {
            return res.status(400).json({ success: false, message: "Job description is required" })
        }

        // Atomically reserve an analysis slot (only matters for free users)
        const reservation = await reserveAnalysisUsage(req.user.id, requestId)
        if (!reservation) {
            // Free user has reached the limit — get details for the error response
            const status = await getFreeUsageStatus(req.user.id)
            const usage = status.usage
            return res.status(429).json({
                success: false,
                error: {
                    code: "FREE_ANALYSIS_LIMIT_REACHED",
                    message: `You have used all ${usage.limit} free analyses available within 24 hours.`,
                    limit: usage.limit,
                    used: usage.used,
                    remaining: usage.remaining,
                    nextResetAt: usage.nextResetAt,
                    upgradeRequired: true,
                },
            })
        }

        // Determine feature scope based on plan (or admin role)
        const user = await userModel.findById(req.user.id).select("role plan subscriptionStatus")
        const isPro = isActivePro(user)

        const interViewReportByAi = await generateInterviewReport({
            resume: resumeText,
            selfDescription,
            jobDescription,
            companyName,
            includeBehavioral: isPro,
            includePrepPlan: isPro,
        })

        if (!interViewReportByAi || typeof interViewReportByAi !== "object") {
            throw new Error("AI service returned an invalid response")
        }

        // Sanitize fields before creating in DB to prevent Mongoose ValidationErrors
        const cleanSkillGaps = Array.isArray(interViewReportByAi.skillGaps)
            ? interViewReportByAi.skillGaps.map(g => ({
                skill: String(g.skill || "Core competency"),
                severity: ["low", "medium", "high"].includes(String(g.severity).toLowerCase())
                    ? String(g.severity).toLowerCase()
                    : "medium"
            }))
            : []

        const cleanTechnicalQuestions = Array.isArray(interViewReportByAi.technicalQuestions)
            ? interViewReportByAi.technicalQuestions.map(q => ({
                question: String(q.question || "Technical Question"),
                intention: String(q.intention || "Assess domain depth"),
                answer: String(q.answer || "Structured technical approach")
            }))
            : []

        const cleanBehavioralQuestions = Array.isArray(interViewReportByAi.behavioralQuestions)
            ? interViewReportByAi.behavioralQuestions.map(q => ({
                question: String(q.question || "Behavioral Question"),
                intention: String(q.intention || "Assess situational judgment"),
                answer: String(q.answer || "STAR response approach")
            }))
            : []

        let cleanScore = Number(String(interViewReportByAi.matchScore ?? "50").replace(/[^0-9.]/g, ""))
        if (isNaN(cleanScore)) cleanScore = 50
        cleanScore = Math.max(0, Math.min(100, Math.round(cleanScore)))

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeText,
            selfDescription,
            jobDescription,
            companyName,
            ...interViewReportByAi,
            matchScore: cleanScore,
            title: interViewReportByAi.title || `Assessment: ${companyName || "Target Role"}`,
            technicalQuestions: cleanTechnicalQuestions,
            behavioralQuestions: cleanBehavioralQuestions,
            skillGaps: cleanSkillGaps,
            atsBuzzwords: Array.isArray(interViewReportByAi.atsBuzzwords) ? interViewReportByAi.atsBuzzwords.map(String) : [],
        })

        // Mark the reservation as completed
        await completeAnalysisUsage(requestId, interviewReport._id)

        // Serialize with entitlements
        const serialized = serializeReportForUser(interviewReport, user)

        res.status(201).json({
            success: true,
            message: "Interview report generated successfully.",
            interviewReport: serialized,
        })
    } catch (error) {
        try {
            await failAnalysisUsage(requestId)
        } catch (failErr) {
            console.error("failAnalysisUsage error:", failErr.message)
        }
        console.error(`[Interview] ERROR:`, error.name, "-", error.message)
        if (error.stack) console.error(error.stack.split("\n").slice(0, 6).join("\n"))

        const statusCode = error.statusCode || 500
        res.status(statusCode).json({
            success: false,
            error: {
                code: error.code || error.name || "AI_SERVICE_ERROR",
                message: error.message || "Internal server error during report generation",
            },
        })
    }
}

/**
 * @description Controller to get interview report by interviewId.
 */
async function getInterviewReportByIdController(req, res, next) {
    try {
        const { interviewId } = req.params

        if (!interviewId) {
            return res.status(400).json({ success: false, message: "Interview ID is required" })
        }

        const user = await userModel.findById(req.user.id).select("role plan subscriptionStatus")
        const query = user?.role === "admin"
            ? { _id: interviewId }
            : { _id: interviewId, user: req.user.id }

        const interviewReport = await interviewReportModel.findOne(query)

        if (!interviewReport) {
            return res.status(404).json({ success: false, message: "Interview report not found." })
        }

        // Apply entitlement-aware serialization
        const serialized = serializeReportForUser(interviewReport, user)

        res.status(200).json({
            success: true,
            message: "Interview report fetched successfully.",
            interviewReport: serialized,
        })
    } catch (error) {
        console.error("getInterviewReportById error:", error.message, error.stack)
        next(error)
    }
}

/**
 * @description Controller to get all interview reports of logged in user.
 */
async function getAllInterviewReportsController(req, res, next) {
    try {
        const interviewReports = await interviewReportModel
            .find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan -atsBuzzwords")

        res.status(200).json({
            success: true,
            message: "Interview reports fetched successfully.",
            interviewReports,
        })
    } catch (error) {
        console.error("getAllInterviewReports error:", error.message, error.stack)
        next(error)
    }
}

/**
 * @description Controller to generate resume PDF based on user self description, resume and job description.
 */
async function generateResumePdfController(req, res, next) {
    try {
        const { interviewReportId } = req.params

        if (!interviewReportId) {
            return res.status(400).json({ success: false, message: "Interview report ID is required" })
        }

        const user = await userModel.findById(req.user.id).select("role")
        const query = user?.role === "admin"
            ? { _id: interviewReportId }
            : { _id: interviewReportId, user: req.user.id }

        const interviewReport = await interviewReportModel.findOne(query)

        if (!interviewReport) {
            return res.status(404).json({ success: false, message: "Interview report not found." })
        }

        const { resume, jobDescription, selfDescription } = interviewReport

        const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
        })

        res.send(pdfBuffer)
    } catch (error) {
        console.error("generateResumePdf error:", error.message, error.stack)
        next(error)
    }
}

module.exports = { generateInterViewReportController, getInterviewReportByIdController, getAllInterviewReportsController, generateResumePdfController }
