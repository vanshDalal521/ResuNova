const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")
const puppeteer = require("puppeteer")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})


const interviewReportSchema = z.object({
    matchScore: z.number().describe("A critical score (0-100) of how well the resume matches the JD. If the candidate is from a different domain (e.g. Frontend applying for Data Science), this score MUST be less than 20%."),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("A concise and professional title for this interview plan"),
    atsBuzzwords: z.array(z.string()).describe("List of essential ATS keywords and buzzwords from the Job Description that the candidate should ensure are present in their resume."),
})

async function generateInterviewReport({ resume, selfDescription, jobDescription, companyName }) {
    try {
        const prompt = `You are an elite, highly critical Technical Interviewer and Hiring Manager. Evaluate this candidate for the following role:
                        Target Company: ${companyName || "a Top-tier Tech Firm"}
                        Job Description: ${jobDescription}
                        Resume/Profile: ${resume || selfDescription}

                        SCORING CRITERIA (BE BRUTAL AND HONEST):
                        - Match Score (0-100): 
                            - < 20%: DOMAIN MISMATCH. (e.g., A Frontend developer applying for Data Science or Backend without relevant experience).
                            - 20-50%: Significant skill gaps. Fundamental missing prerequisites.
                            - 50-75%: Relevant domain but lacks specific tool mastery or industry depth.
                            - 75-90%: Strong fit. Just needs to brush up on specific company-style questions.
                            - 90-100%: Rare talent. High probability of offer.

                        ANALYSIS INSTRUCTIONS:
                        1. DOMAIN VALIDATION: First, check if the candidate's core expertise aligns with the Job Description's field. If they are from a completely different domain (e.g. React/Frontend vs. ML/Data Science), DO NOT exceed 20% in the match score.
                        2. TECHNICAL QUESTIONS: Identify major gaps. Generate at least 12-15 difficult technical questions focusing on challenging those gaps and deeply related to the job role and ${companyName || "the target company"}.
                        3. BEHAVIORAL QUESTIONS: Generate at least 10-12 behavioral questions tailored to leadership, cultural fit, and specific scenarios for ${companyName || "the target company"}.
                        4. ATS BUZZWORDS: Extract the most crucial buzzwords and keywords from the job description to help the candidate improve their resume.
                        5. FORMAT: Return only valid JSON following the provided schema. No markdown wrappers.
    `

        console.log("Calling Gemini API with model: models/gemini-2.5-flash");
        let result;
        let retries = 3;
        while (retries > 0) {
            try {
                result = await ai.models.generateContent({
                    model: "models/gemini-2.5-flash",
                    contents: [{ role: "user", parts: [{ text: prompt }] }],
                    config: {
                        responseMimeType: "application/json",
                        responseSchema: zodToJsonSchema(interviewReportSchema),
                    }
                });
                break; // Success!
            } catch (error) {
                if (error.message.includes("429") && retries > 1) {
                    console.log(`Rate limited. Retrying in 5s... (${retries - 1} retries left)`);
                    await new Promise(resolve => setTimeout(resolve, 5000));
                    retries--;
                } else {
                    throw error;
                }
            }
        }

        let text = result.text || "{}";
        text = text.replace(/```json\n?|```/g, "").trim();
        const jsonResponse = JSON.parse(text);

        // Optional: Validate with Zod for extra safety
        const validated = interviewReportSchema.safeParse(jsonResponse);
        if (!validated.success) {
            console.error("Zod Validation Error:", validated.error);
            return jsonResponse;
        }

        return validated.data;
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw new Error(`Failed to generate interview report: ${error.message}`);
    }
}

async function generatePdfFromHtml(htmlContent) {
    let browser;
    try {
        browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            headless: 'new'
        });
        const page = await browser.newPage();

        // Set a reasonable viewport for PDF generation
        await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });

        await page.setContent(htmlContent, {
            waitUntil: ["networkidle0", "load", "domcontentloaded"],
            timeout: 30000
        });

        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: {
                top: "20mm",
                bottom: "20mm",
                left: "15mm",
                right: "15mm"
            }
        });

        return pdfBuffer;
    } catch (error) {
        console.error("Puppeteer Error:", error);
        throw new Error(`Failed to generate PDF: ${error.message}`);
    } finally {
        if (browser) await browser.close();
    }
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
    try {
        const resumePdfSchema = z.object({
            html: z.string().describe("The HTML content of the resume")
        });

        const prompt = `Generate a high-quality, professional resume for a candidate with the following details:
                        Resume Data: ${resume}
                        Self Description: ${selfDescription}
                        Target Job Description: ${jobDescription}

                        Instructions:
                        1. The response MUST be a JSON object with a single field "html".
                        2. The HTML should be a complete document including <style> tags.
                        3. Design: Use a clean, modern, and professional layout. Use a nice sans-serif font (e.g., Arial, Helvetica).
                        4. Structure: Include Contact Info, Summary, Skills, Experience, and Education.
                        5. Tailoring & ATS Optimization: Identify MUST-HAVE buzzwords and keywords from the target Job Description and strategically rewrite all bullet points and the summary to organically include them. Your goal is to generate the absolute BEST ATS-friendly resume possible that guarantees a 90%+ match score.
                        6. ATS Friendly Formatting: Strictly use clean semantic HTML (h1, h2, ul, li) and avoid any complex graphics, columns, or tables that might break ATS parsing. The layout must be simple, linear, and highly professional.
                        7. Improve Content: Heavily rewrite the candidate's original resume phrasing. Elevate it into highly impactful, action-oriented bullet points starting with strong verbs, ensuring quantifiable results are highlighted where applicable. Fill in minor gaps professionally if needed to make the profile look elite.
                    `;

        console.log("Calling Gemini API for resume generation with model: models/gemini-2.5-flash...");
        let result;
        let retries = 3;
        while (retries > 0) {
            try {
                result = await ai.models.generateContent({
                    model: "models/gemini-flash-latest",
                    contents: [{ role: "user", parts: [{ text: prompt }] }],
                    config: {
                        responseMimeType: "application/json",
                        responseSchema: zodToJsonSchema(resumePdfSchema),
                    }
                });
                break;
            } catch (error) {
                if (error.message.includes("429") && retries > 1) {
                    console.log(`Rate limited in resume generation. Retrying in 5s... (${retries - 1} retries left)`);
                    await new Promise(resolve => setTimeout(resolve, 5000));
                    retries--;
                } else {
                    throw error;
                }
            }
        }

        let text = result.text || "{}";
        text = text.replace(/```json\n?|```/g, "").trim();
        const jsonContent = JSON.parse(text);

        if (!jsonContent.html) {
            throw new Error("No HTML content returned from AI");
        }

        const pdfBuffer = await generatePdfFromHtml(jsonContent.html);
        return pdfBuffer;
    } catch (error) {
        console.error("Resume Generation Error:", error);
        throw new Error(`Failed to generate resume: ${error.message}`);
    }
}

module.exports = { generateInterviewReport, generateResumePdf }