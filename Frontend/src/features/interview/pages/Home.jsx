import React, { useState, useRef } from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { 
    Briefcase, 
    User, 
    UploadCloud, 
    Info, 
    Sparkles, 
    Clock, 
    ChevronRight,
    Search,
    FileText
} from 'lucide-react'
import toast from 'react-hot-toast'
import ProfileMenu from '../../auth/components/ProfileMenu'

const Home = () => {
    const { loading, generateReport, reports } = useInterview()
    const [ jobDescription, setJobDescription ] = useState("")
    const [ selfDescription, setSelfDescription ] = useState("")
    const [ companyName, setCompanyName ] = useState("")
    const [ fileName, setFileName ] = useState("")
    const resumeInputRef = useRef()
    const navigate = useNavigate()

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error("File size exceeds 5MB")
                e.target.value = ""
                setFileName("")
                return
            }
            setFileName(file.name)
            toast.success(`Selected: ${file.name}`)
        }
    }

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0]
        
        if (!jobDescription.trim()) {
            toast.error("Please provide a job description")
            return
        }

        if (!resumeFile && !selfDescription.trim()) {
            toast.error("Please upload a resume or provide a self-description")
            return
        }

        const promise = generateReport({ jobDescription, selfDescription, resumeFile, companyName })
        
        toast.promise(promise, {
            loading: 'Generating your custom interview strategy...',
            success: 'Strategy generated successfully!',
            error: 'Failed to generate strategy. Please try again.',
        })

        const data = await promise
        if (data && data._id) {
            navigate(`/interview/${data._id}`)
        }
    }

    if (loading) {
        return (
            <motion.main 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='loading-screen'
            >
                <div className="loading-spinner"></div>
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h1>Neural Matching in Progress</h1>
                    <p>Our agentic core is synthesizing your profile with market benchmarks to generate a deterministic success plan.</p>
                </motion.div>
            </motion.main>
        )
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='home-page'
        >
            {/* Page Header */}
            <header className='page-header'>
                <div style={{ position: 'absolute', top: '2rem', right: '2rem' }}>
                    <ProfileMenu />
                </div>
                <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    Elevate Your <span className='highlight'>Placement Strategy</span>
                </motion.h1>
                <motion.p
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    Architect your career path with AI-driven technical blueprints, 
                    comprehensive behavioral frameworks, and optimized study roadmaps.
                </motion.p>
            </header>

            {/* Main Card */}
            <motion.div 
                className='interview-card'
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
            >
                <div className='interview-card__body'>
                    {/* Left Panel - Job Description */}
                    <div className='panel panel--left'>
                        <div className='panel__header'>
                            <span className='panel__icon'>
                                <Briefcase />
                            </span>
                            <h2>Position Specifications</h2>
                            <span className='badge badge--required'>Essential</span>
                        </div>
                        
                        <div className='input-group' style={{ marginBottom: '1.5rem' }}>
                            <label className='section-label' style={{ display: 'block', marginBottom: '0.5rem' }}>Target Company</label>
                            <input 
                                type="text"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                className='panel__input'
                                placeholder="e.g. Google, Amazon, OpenAI..."
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '8px',
                                    color: '#e6edf3',
                                    outline: 'none'
                                }}
                            />
                        </div>

                        <label className='section-label' style={{ display: 'block', marginBottom: '0.5rem' }}>Job Description</label>
                        <textarea
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            className='panel__textarea'
                            placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                            maxLength={5000}
                        />
                        <div className='char-counter'>{jobDescription.length} / 5000 chars</div>
                    </div>

                    {/* Vertical Divider */}
                    <div className='panel-divider' />

                    {/* Right Panel - Profile */}
                    <div className='panel panel--right'>
                        <div className='panel__header'>
                            <span className='panel__icon'>
                                <User />
                            </span>
                            <h2>Candidate Intelligence</h2>
                        </div>

                        {/* Upload Resume */}
                        <div className='upload-section'>
                            <label className='section-label'>
                                Upload Resume
                                <span className='badge badge--best'>Best Results</span>
                            </label>
                            <label className='dropzone' htmlFor='resume'>
                                <span className='dropzone__icon'>
                                    <UploadCloud size={32} />
                                </span>
                                <p className='dropzone__title'>{fileName || "Click to upload or drag & drop"}</p>
                                <p className='dropzone__subtitle'>PDF or DOCX (Max 5MB)</p>
                                <input 
                                    ref={resumeInputRef} 
                                    hidden 
                                    type='file' 
                                    id='resume' 
                                    name='resume' 
                                    accept='.pdf,.docx'
                                    onChange={handleFileChange}
                                />
                            </label>
                        </div>

                        {/* OR Divider */}
                        <div className='or-divider'><span>OR</span></div>

                        {/* Quick Self-Description */}
                        <div className='self-description'>
                            <label className='section-label' htmlFor='selfDescription'>Quick Self-Description</label>
                            <textarea
                                value={selfDescription}
                                onChange={(e) => setSelfDescription(e.target.value)}
                                id='selfDescription'
                                name='selfDescription'
                                className='panel__textarea panel__textarea--short'
                                placeholder="Briefly describe your experience, key skills, and years of experience..."
                            />
                        </div>

                        {/* Info Box */}
                        <div className='info-box'>
                            <span className='info-box__icon'>
                                <Info size={18} />
                            </span>
                            <p>Providing a <strong>Resume</strong> yields significantly higher accuracy for your plan.</p>
                        </div>
                    </div>
                </div>

                {/* Card Footer */}
                <div className='interview-card__footer'>
                    <div className='footer-info'>
                        <Clock size={14} />
                        <span>Analysis takes approx. 30 seconds</span>
                    </div>
                    <button
                        onClick={handleGenerateReport}
                        disabled={loading}
                        className='generate-btn'>
                        <Sparkles size={18} />
                        Initialize Agentic Analysis
                    </button>
                </div>
            </motion.div>

            {/* Recent Reports List */}
            <AnimatePresence mode="popLayout">
                {reports && reports.length > 0 && (
                    <motion.section 
                        className='recent-reports'
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                        layout
                    >
                        <h2>My Recent Interview Plans</h2>
                        <div className='reports-list'>
                            {reports.map((report, index) => (
                                <motion.div 
                                    key={report._id} 
                                    className='report-item' 
                                    onClick={() => navigate(`/interview/${report._id}`)}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.05 * index, duration: 0.4 }}
                                    whileHover={{ y: -8, scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                    layout
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <h3 style={{ fontSize: '1.4rem' }}>{report.title || 'Untitled Position'}</h3>
                                        <ChevronRight size={18} color="#8b949e" />
                                    </div>
                                    <p className='report-meta'>
                                        <Clock size={12} style={{ display: 'inline', marginRight: '4px' }} />
                                        {new Date(report.createdAt).toLocaleDateString()}
                                    </p>
                                    <div className={`match-score ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low'}`}>
                                        Match Score: {report.matchScore}%
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* Page Footer */}
            <footer className='page-footer'>
                <a href='#'>Privacy Policy</a>
                <a href='#'>Terms of Service</a>
                <a href='#'>Documentation</a>
                <a href='#'>Support</a>
            </footer>
        </motion.div>
    )
}

export default Home