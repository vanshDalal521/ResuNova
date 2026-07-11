import { useParams, useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, Sparkles, Check, Shield
} from 'lucide-react'
import Logo from '../../../components/Logo'
import { capabilities } from '../data/landingData'
import '../style/landing.scss'

/* ─── SVG MOCKUPS ───────────────────────────── */

const AnalysisMockup = ({ color }) => (
  <svg viewBox="0 0 600 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="preview-mockup">
    <rect x="0" y="0" width="600" height="360" rx="16" fill="#F5F7FF" stroke="rgba(167,183,231,0.2)" strokeWidth="1" />
    <rect x="0" y="0" width="600" height="48" rx="16" fill="rgba(167,183,231,0.08)" />
    <rect x="0" y="32" width="600" height="16" fill="rgba(167,183,231,0.08)" />
    <circle cx="20" cy="24" r="6" fill="#FF5F57" />
    <circle cx="40" cy="24" r="6" fill="#FEBC2E" />
    <circle cx="60" cy="24" r="6" fill="#28C840" />
    <text x="88" y="28" fill="#0d0d2b" fontFamily="Outfit" fontSize="12" fontWeight="600">Analysis Report</text>
    <rect x="16" y="60" width="272" height="130" rx="10" fill="white" stroke="rgba(167,183,231,0.15)" strokeWidth="1" />
    <text x="28" y="80" fill="#0d0d2b" fontFamily="Outfit" fontSize="11" fontWeight="700">RESUME</text>
    <text x="28" y="98" fill="#222255" fontFamily="Outfit" fontSize="9">Senior Software Engineer</text>
    <text x="28" y="113" fill="#222255" fontFamily="Outfit" fontSize="9">5+ years React, Node.js, AWS</text>
    <text x="28" y="128" fill="#222255" fontFamily="Outfit" fontSize="9">Led 3 cross-functional teams</text>
    <text x="28" y="143" fill="#222255" fontFamily="Outfit" fontSize="9">Built distributed systems</text>
    <text x="28" y="158" fill="#222255" fontFamily="Outfit" fontSize="9">Mentored 12 junior engineers</text>
    <rect x="16" y="200" width="272" height="130" rx="10" fill="white" stroke="rgba(167,183,231,0.15)" strokeWidth="1" />
    <text x="28" y="220" fill="#0d0d2b" fontFamily="Outfit" fontSize="11" fontWeight="700">JOB DESCRIPTION</text>
    <text x="28" y="238" fill="#222255" fontFamily="Outfit" fontSize="9">Staff Frontend Engineer</text>
    <text x="28" y="253" fill="#222255" fontFamily="Outfit" fontSize="9">React, TypeScript, GraphQL</text>
    <text x="28" y="268" fill="#222255" fontFamily="Outfit" fontSize="9">System design expert</text>
    <text x="28" y="283" fill="#222255" fontFamily="Outfit" fontSize="9">Team leadership experience</text>
    <text x="28" y="298" fill="#222255" fontFamily="Outfit" fontSize="9">Performance optimization</text>
    <rect x="304" y="60" width="280" height="270" rx="10" fill="white" stroke="rgba(167,183,231,0.15)" strokeWidth="1" />
    <text x="316" y="80" fill="#0d0d2b" fontFamily="Outfit" fontSize="11" fontWeight="700">MATCH ANALYSIS</text>
    <rect x="316" y="92" width="124" height="56" rx="8" fill={`${color}15`} stroke={`${color}30`} strokeWidth="1" />
    <text x="378" y="112" fill={color} fontFamily="Bebas Neue" fontSize="22" textAnchor="middle">94%</text>
    <text x="378" y="132" fill="#3d3d70" fontFamily="Outfit" fontSize="9" textAnchor="middle">Role Match</text>
    <rect x="448" y="92" width="124" height="56" rx="8" fill={`${color}15`} stroke={`${color}30`} strokeWidth="1" />
    <text x="510" y="112" fill={color} fontFamily="Bebas Neue" fontSize="22" textAnchor="middle">6</text>
    <text x="510" y="132" fill="#3d3d70" fontFamily="Outfit" fontSize="9" textAnchor="middle">Gaps Found</text>
    <rect x="316" y="158" width="256" height="24" rx="6" fill="rgba(197,208,240,0.2)" />
    <rect x="316" y="158" width="230" height="24" rx="6" fill="#0d0d2b" opacity="0.15" />
    <text x="324" y="174" fill="#0d0d2b" fontFamily="Outfit" fontSize="10">Frontend Architecture</text>
    <text x="556" y="174" fill="#222255" fontFamily="Outfit" fontSize="10">92%</text>
    <rect x="316" y="190" width="256" height="24" rx="6" fill="rgba(197,208,240,0.2)" />
    <rect x="316" y="190" width="128" height="24" rx="6" fill={`${color}60`} />
    <text x="324" y="206" fill="#0d0d2b" fontFamily="Outfit" fontSize="10">TypeScript Mastery</text>
    <text x="556" y="206" fill="#222255" fontFamily="Outfit" fontSize="10">45%</text>
    <rect x="316" y="222" width="256" height="24" rx="6" fill="rgba(197,208,240,0.2)" />
    <rect x="316" y="222" width="210" height="24" rx="6" fill="#0d0d2b" opacity="0.15" />
    <text x="324" y="238" fill="#0d0d2b" fontFamily="Outfit" fontSize="10">System Design</text>
    <text x="556" y="238" fill="#222255" fontFamily="Outfit" fontSize="10">85%</text>
    <rect x="316" y="254" width="256" height="24" rx="6" fill="rgba(197,208,240,0.2)" />
    <rect x="316" y="254" width="100" height="24" rx="6" fill={`${color}60`} />
    <text x="324" y="270" fill="#0d0d2b" fontFamily="Outfit" fontSize="10">GraphQL</text>
    <text x="556" y="270" fill="#222255" fontFamily="Outfit" fontSize="10">35%</text>
    <text x="440" y="310" fill="#3d3d70" fontFamily="Outfit" fontSize="10">Gaps highlighted in accent color</text>
    <rect x="316" y="320" width="256" height="1" fill="rgba(167,183,231,0.15)" />
    <text x="316" y="338" fill="#0d0d2b" fontFamily="Outfit" fontSize="10" fontWeight="600">Next Step</text>
    <text x="500" y="338" fill={color} fontFamily="Outfit" fontSize="10">Generate Questions →</text>
  </svg>
)

const QuestionsMockup = ({ color }) => (
  <svg viewBox="0 0 600 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="preview-mockup">
    <rect x="0" y="0" width="600" height="360" rx="16" fill="#F5F7FF" stroke="rgba(167,183,231,0.2)" strokeWidth="1" />
    <rect x="0" y="0" width="600" height="48" rx="16" fill="rgba(167,183,231,0.08)" />
    <rect x="0" y="32" width="600" height="16" fill="rgba(167,183,231,0.08)" />
    <circle cx="20" cy="24" r="6" fill="#FF5F57" />
    <circle cx="40" cy="24" r="6" fill="#FEBC2E" />
    <circle cx="60" cy="24" r="6" fill="#28C840" />
    <text x="88" y="28" fill="#0d0d2b" fontFamily="Outfit" fontSize="12" fontWeight="600">Question Bank</text>
    <rect x="16" y="60" width="568" height="36" rx="8" fill="white" stroke="rgba(167,183,231,0.12)" strokeWidth="1" />
    <text x="28" y="83" fill={color} fontFamily="Outfit" fontSize="10" fontWeight="700">TECHNICAL</text>
    <text x="480" y="83" fill="#3d3d70" fontFamily="Outfit" fontSize="9">Difficulty: Medium</text>
    <text x="28" y="116" fill="#0d0d2b" fontFamily="Outfit" fontSize="11" fontWeight="600">Design a real-time collaborative editing system</text>
    <text x="28" y="134" fill="#222255" fontFamily="Outfit" fontSize="9">Covers: WebSockets, CRDT, Operational Transform, Conflict Resolution</text>
    <rect x="16" y="148" width="568" height="1" fill="rgba(167,183,231,0.1)" />
    <rect x="16" y="160" width="568" height="36" rx="8" fill="white" stroke="rgba(167,183,231,0.12)" strokeWidth="1" />
    <text x="28" y="183" fill={color} fontFamily="Outfit" fontSize="10" fontWeight="700">BEHAVIORAL</text>
    <text x="480" y="183" fill="#3d3d70" fontFamily="Outfit" fontSize="9">Company: Google</text>
    <text x="28" y="216" fill="#0d0d2b" fontFamily="Outfit" fontSize="11" fontWeight="600">Tell me about a time you handled conflicting priorities</text>
    <text x="28" y="234" fill="#222255" fontFamily="Outfit" fontSize="9">Framework: STAR | Focus: Leadership, Decision-making, Trade-offs</text>
    <rect x="16" y="248" width="568" height="1" fill="rgba(167,183,231,0.1)" />
    <rect x="16" y="260" width="568" height="36" rx="8" fill="white" stroke="rgba(167,183,231,0.12)" strokeWidth="1" />
    <text x="28" y="283" fill={color} fontFamily="Outfit" fontSize="10" fontWeight="700">SYSTEM DESIGN</text>
    <text x="480" y="283" fill="#3d3d70" fontFamily="Outfit" fontSize="9">Difficulty: Hard</text>
    <text x="28" y="316" fill="#0d0d2b" fontFamily="Outfit" fontSize="11" fontWeight="600">Design YouTube's recommendation pipeline</text>
    <text x="28" y="334" fill="#222255" fontFamily="Outfit" fontSize="9">Covers: ML Pipeline, Feature Store, AB Testing, Caching Strategy</text>
  </svg>
)

const GapsMockup = ({ color }) => (
  <svg viewBox="0 0 600 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="preview-mockup">
    <rect x="0" y="0" width="600" height="360" rx="16" fill="#F5F7FF" stroke="rgba(167,183,231,0.2)" strokeWidth="1" />
    <rect x="0" y="0" width="600" height="48" rx="16" fill="rgba(167,183,231,0.08)" />
    <rect x="0" y="32" width="600" height="16" fill="rgba(167,183,231,0.08)" />
    <circle cx="20" cy="24" r="6" fill="#FF5F57" />
    <circle cx="40" cy="24" r="6" fill="#FEBC2E" />
    <circle cx="60" cy="24" r="6" fill="#28C840" />
    <text x="88" y="28" fill="#0d0d2b" fontFamily="Outfit" fontSize="12" fontWeight="600">Skill Gap Roadmap</text>
    <text x="420" y="28" fill="#3d3d70" fontFamily="Outfit" fontSize="10">Priority: Impact ↓</text>
    <rect x="16" y="60" width="568" height="48" rx="10" fill={`${color}10`} stroke={`${color}25`} strokeWidth="1" />
    <text x="28" y="80" fill="#0d0d2b" fontFamily="Outfit" fontSize="11" fontWeight="700">CRITICAL · Close in ~2 weeks</text>
    <text x="28" y="96" fill="#222255" fontFamily="Outfit" fontSize="10">React Server Components · Next.js App Router · Streaming SSR</text>
    <rect x="430" y="68" width="50" height="22" rx="6" fill="#0d0d2b" />
    <text x="455" y="83" fill="#EDF0FF" fontFamily="Outfit" fontSize="9" fontWeight="600" textAnchor="middle">GAP</text>
    <rect x="488" y="68" width="84" height="22" rx="6" fill="rgba(167,183,231,0.1)" />
    <text x="530" y="83" fill="#0d0d2b" fontFamily="Outfit" fontSize="9" fontWeight="600" textAnchor="middle">Learn More →</text>
    <rect x="16" y="116" width="568" height="48" rx="10" fill={`${color}10`} stroke={`${color}25`} strokeWidth="1" />
    <text x="28" y="136" fill="#0d0d2b" fontFamily="Outfit" fontSize="11" fontWeight="700">CRITICAL · Close in ~1 week</text>
    <text x="28" y="152" fill="#222255" fontFamily="Outfit" fontSize="10">TypeScript Advanced Patterns · Conditional Types · Mapped Types</text>
    <rect x="430" y="124" width="50" height="22" rx="6" fill="#0d0d2b" />
    <text x="455" y="139" fill="#EDF0FF" fontFamily="Outfit" fontSize="9" fontWeight="600" textAnchor="middle">GAP</text>
    <rect x="488" y="124" width="84" height="22" rx="6" fill="rgba(167,183,231,0.1)" />
    <text x="530" y="139" fill="#0d0d2b" fontFamily="Outfit" fontSize="9" fontWeight="600" textAnchor="middle">Learn More →</text>
    <rect x="16" y="172" width="568" height="48" rx="10" fill="white" stroke="rgba(167,183,231,0.12)" strokeWidth="1" />
    <text x="28" y="192" fill="#0d0d2b" fontFamily="Outfit" fontSize="11" fontWeight="700">MODERATE · Close in ~3 weeks</text>
    <text x="28" y="208" fill="#222255" fontFamily="Outfit" fontSize="10">GraphQL Federation · Apollo Router · Schema Composition</text>
    <rect x="430" y="180" width="50" height="22" rx="6" fill="rgba(167,183,231,0.15)" />
    <text x="455" y="195" fill="#3d3d70" fontFamily="Outfit" fontSize="9" fontWeight="600" textAnchor="middle">WEAK</text>
    <rect x="488" y="180" width="84" height="22" rx="6" fill="rgba(167,183,231,0.1)" />
    <text x="530" y="195" fill="#0d0d2b" fontFamily="Outfit" fontSize="9" fontWeight="600" textAnchor="middle">Learn More →</text>
    <rect x="16" y="228" width="568" height="48" rx="10" fill="white" stroke="rgba(167,183,231,0.12)" strokeWidth="1" />
    <text x="28" y="248" fill="#0d0d2b" fontFamily="Outfit" fontSize="11" fontWeight="700">MINOR · Close in ~1 day</text>
    <text x="28" y="264" fill="#222255" fontFamily="Outfit" fontSize="10">Docker Compose · Multi-stage Builds · Container Optimization</text>
    <rect x="430" y="236" width="50" height="22" rx="6" fill="rgba(167,183,231,0.15)" />
    <text x="455" y="251" fill="#3d3d70" fontFamily="Outfit" fontSize="9" fontWeight="600" textAnchor="middle">WEAK</text>
    <rect x="488" y="236" width="84" height="22" rx="6" fill="rgba(167,183,231,0.1)" />
    <text x="530" y="251" fill="#0d0d2b" fontFamily="Outfit" fontSize="9" fontWeight="600" textAnchor="middle">Learn More →</text>
    <text x="300" y="310" fill="#3d3d70" fontFamily="Outfit" fontSize="10" textAnchor="middle">6 gaps identified · Est. close time: 4 weeks</text>
    <rect x="200" y="324" width="200" height="24" rx="8" fill={`${color}20`} />
    <text x="300" y="340" fill="#0d0d2b" fontFamily="Outfit" fontSize="10" fontWeight="600" textAnchor="middle">View Full Roadmap →</text>
  </svg>
)

const PlanMockup = ({ color }) => (
  <svg viewBox="0 0 600 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="preview-mockup">
    <rect x="0" y="0" width="600" height="360" rx="16" fill="#F5F7FF" stroke="rgba(167,183,231,0.2)" strokeWidth="1" />
    <rect x="0" y="0" width="600" height="48" rx="16" fill="rgba(167,183,231,0.08)" />
    <rect x="0" y="32" width="600" height="16" fill="rgba(167,183,231,0.08)" />
    <circle cx="20" cy="24" r="6" fill="#FF5F57" />
    <circle cx="40" cy="24" r="6" fill="#FEBC2E" />
    <circle cx="60" cy="24" r="6" fill="#28C840" />
    <text x="88" y="28" fill="#0d0d2b" fontFamily="Outfit" fontSize="12" fontWeight="600">Prep Calendar · 14-Day Plan</text>
    <rect x="16" y="60" width="82" height="80" rx="8" fill={`${color}15`} stroke={`${color}25`} strokeWidth="1" />
    <text x="57" y="88" fill={color} fontFamily="Bebas Neue" fontSize="22" textAnchor="middle">1</text>
    <text x="57" y="104" fill="#0d0d2b" fontFamily="Outfit" fontSize="9" fontWeight="600" textAnchor="middle">Systems</text>
    <text x="57" y="118" fill="#3d3d70" fontFamily="Outfit" fontSize="8" textAnchor="middle">3h study</text>
    <rect x="106" y="60" width="82" height="80" rx="8" fill={`${color}15`} stroke={`${color}25`} strokeWidth="1" />
    <text x="147" y="88" fill={color} fontFamily="Bebas Neue" fontSize="22" textAnchor="middle">2</text>
    <text x="147" y="104" fill="#0d0d2b" fontFamily="Outfit" fontSize="9" fontWeight="600" textAnchor="middle">Algorithms</text>
    <text x="147" y="118" fill="#3d3d70" fontFamily="Outfit" fontSize="8" textAnchor="middle">2h practice</text>
    <rect x="196" y="60" width="82" height="80" rx="8" fill={`${color}15`} stroke={`${color}25`} strokeWidth="1" />
    <text x="237" y="88" fill={color} fontFamily="Bebas Neue" fontSize="22" textAnchor="middle">3</text>
    <text x="237" y="104" fill="#0d0d2b" fontFamily="Outfit" fontSize="9" fontWeight="600" textAnchor="middle">Frontend</text>
    <text x="237" y="118" fill="#3d3d70" fontFamily="Outfit" fontSize="8" textAnchor="middle">3h deep dive</text>
    <rect x="286" y="60" width="82" height="80" rx="8" fill="white" stroke="rgba(167,183,231,0.12)" strokeWidth="1" />
    <text x="327" y="88" fill="#3d3d70" fontFamily="Bebas Neue" fontSize="22" textAnchor="middle">4</text>
    <text x="327" y="104" fill="#0d0d2b" fontFamily="Outfit" fontSize="9" fontWeight="600" textAnchor="middle">Review</text>
    <text x="327" y="118" fill="#3d3d70" fontFamily="Outfit" fontSize="8" textAnchor="middle">Light day</text>
    <rect x="376" y="60" width="82" height="80" rx="8" fill={`${color}15`} stroke={`${color}25`} strokeWidth="1" />
    <text x="417" y="88" fill={color} fontFamily="Bebas Neue" fontSize="22" textAnchor="middle">5</text>
    <text x="417" y="104" fill="#0d0d2b" fontFamily="Outfit" fontSize="9" fontWeight="600" textAnchor="middle">System Des.</text>
    <text x="417" y="118" fill="#3d3d70" fontFamily="Outfit" fontSize="8" textAnchor="middle">4h workshop</text>
    <rect x="466" y="60" width="82" height="80" rx="8" fill="white" stroke="rgba(167,183,231,0.12)" strokeWidth="1" />
    <text x="507" y="88" fill="#3d3d70" fontFamily="Bebas Neue" fontSize="22" textAnchor="middle">6</text>
    <text x="507" y="104" fill="#0d0d2b" fontFamily="Outfit" fontSize="9" fontWeight="600" textAnchor="middle">Behavioral</text>
    <text x="507" y="118" fill="#3d3d70" fontFamily="Outfit" fontSize="8" textAnchor="middle">2h prep</text>
    <rect x="16" y="148" width="532" height="1" fill="rgba(167,183,231,0.12)" />
    <rect x="16" y="160" width="250" height="80" rx="10" fill={`${color}8`} stroke={`${color}18`} strokeWidth="1" />
    <text x="28" y="180" fill="#0d0d2b" fontFamily="Outfit" fontSize="11" fontWeight="700">Week 1 Focus</text>
    <text x="28" y="198" fill="#222255" fontFamily="Outfit" fontSize="9">• Foundation &amp; core concepts</text>
    <text x="28" y="213" fill="#222255" fontFamily="Outfit" fontSize="9">• Identify weak areas</text>
    <text x="28" y="228" fill="#222255" fontFamily="Outfit" fontSize="9">• Build study momentum</text>
    <rect x="278" y="160" width="250" height="80" rx="10" fill="white" stroke="rgba(167,183,231,0.12)" strokeWidth="1" />
    <text x="290" y="180" fill="#0d0d2b" fontFamily="Outfit" fontSize="11" fontWeight="700">Week 2 Focus</text>
    <text x="290" y="198" fill="#222255" fontFamily="Outfit" fontSize="9">• Deep dive into gaps</text>
    <text x="290" y="213" fill="#222255" fontFamily="Outfit" fontSize="9">• Mock interviews</text>
    <text x="290" y="228" fill="#222255" fontFamily="Outfit" fontSize="9">• Final review &amp; polish</text>
    <rect x="16" y="256" width="532" height="40" rx="8" fill={`${color}15`} />
    <text x="28" y="280" fill="#0d0d2b" fontFamily="Outfit" fontSize="11" fontWeight="600">Today's Focus</text>
    <text x="160" y="280" fill="#222255" fontFamily="Outfit" fontSize="10">System Design · Distributed Systems · 3h study block</text>
    <rect x="460" y="264" width="76" height="24" rx="6" fill="#0d0d2b" />
    <text x="498" y="280" fill="#EDF0FF" fontFamily="Outfit" fontSize="9" fontWeight="600" textAnchor="middle">Start →</text>
    <text x="140" y="320" fill="#3d3d70" fontFamily="Outfit" fontSize="10" textAnchor="middle">42 total study hours · 3 mock interviews · Rest day: Day 7, 14</text>
  </svg>
)

const ReportsMockup = ({ color }) => (
  <svg viewBox="0 0 600 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="preview-mockup">
    <rect x="0" y="0" width="600" height="360" rx="16" fill="#F5F7FF" stroke="rgba(167,183,231,0.2)" strokeWidth="1" />
    <rect x="0" y="0" width="600" height="48" rx="16" fill="rgba(167,183,231,0.08)" />
    <rect x="0" y="32" width="600" height="16" fill="rgba(167,183,231,0.08)" />
    <circle cx="20" cy="24" r="6" fill="#FF5F57" />
    <circle cx="40" cy="24" r="6" fill="#FEBC2E" />
    <circle cx="60" cy="24" r="6" fill="#28C840" />
    <text x="88" y="28" fill="#0d0d2b" fontFamily="Outfit" fontSize="12" fontWeight="600">Interview Strategy Report</text>
    <rect x="420" y="14" width="70" height="22" rx="6" fill={`${color}20`} />
    <text x="455" y="29" fill="#0d0d2b" fontFamily="Outfit" fontSize="9" fontWeight="600" textAnchor="middle">Export PDF</text>
    <rect x="498" y="14" width="70" height="22" rx="6" fill="#0d0d2b" />
    <text x="533" y="29" fill="#EDF0FF" fontFamily="Outfit" fontSize="9" fontWeight="600" textAnchor="middle">Download</text>
    <rect x="16" y="60" width="175" height="80" rx="8" fill="white" stroke="rgba(167,183,231,0.12)" strokeWidth="1" />
    <text x="28" y="80" fill="#0d0d2b" fontFamily="Outfit" fontSize="11" fontWeight="700">Executive Summary</text>
    <text x="28" y="98" fill="#222255" fontFamily="Outfit" fontSize="9">Candidate-Gap Analysis</text>
    <text x="28" y="113" fill="#222255" fontFamily="Outfit" fontSize="9">94% role match · 6 gaps</text>
    <text x="28" y="128" fill="#222255" fontFamily="Outfit" fontSize="9">42h prep plan generated</text>
    <rect x="202" y="60" width="175" height="80" rx="8" fill="white" stroke="rgba(167,183,231,0.12)" strokeWidth="1" />
    <text x="214" y="80" fill="#0d0d2b" fontFamily="Outfit" fontSize="11" fontWeight="700">Question Bank</text>
    <text x="214" y="98" fill="#222255" fontFamily="Outfit" fontSize="9">50 tailored questions</text>
    <text x="214" y="113" fill="#222255" fontFamily="Outfit" fontSize="9">32 technical · 18 behavioral</text>
    <text x="214" y="128" fill="#222255" fontFamily="Outfit" fontSize="9">8 system design deep dives</text>
    <rect x="388" y="60" width="196" height="80" rx="8" fill="white" stroke="rgba(167,183,231,0.12)" strokeWidth="1" />
    <text x="400" y="80" fill="#0d0d2b" fontFamily="Outfit" fontSize="11" fontWeight="700">Prep Timeline</text>
    <text x="400" y="98" fill="#222255" fontFamily="Outfit" fontSize="9">14-day structured plan</text>
    <text x="400" y="113" fill="#222255" fontFamily="Outfit" fontSize="9">42 total study hours</text>
    <text x="400" y="128" fill="#222255" fontFamily="Outfit" fontSize="9">3 mock interview slots</text>
    <rect x="16" y="152" width="568" height="1" fill="rgba(167,183,231,0.12)" />
    <text x="28" y="174" fill="#0d0d2b" fontFamily="Outfit" fontSize="12" fontWeight="700">Report Sections</text>
    <rect x="16" y="186" width="568" height="30" rx="6" fill="white" stroke="rgba(167,183,231,0.1)" strokeWidth="1" />
    <text x="28" y="206" fill="#0d0d2b" fontFamily="Outfit" fontSize="10">01</text>
    <text x="52" y="206" fill="#222255" fontFamily="Outfit" fontSize="10">Resume × JD Match Analysis</text>
    <rect x="400" y="194" width="36" height="16" rx="4" fill={`${color}20`} />
    <text x="418" y="206" fill="#0d0d2b" fontFamily="Outfit" fontSize="8" fontWeight="600" textAnchor="middle">DONE</text>
    <rect x="16" y="220" width="568" height="30" rx="6" fill="white" stroke="rgba(167,183,231,0.1)" strokeWidth="1" />
    <text x="28" y="240" fill="#0d0d2b" fontFamily="Outfit" fontSize="10">02</text>
    <text x="52" y="240" fill="#222255" fontFamily="Outfit" fontSize="10">Skill Gap Breakdown</text>
    <rect x="400" y="228" width="36" height="16" rx="4" fill={`${color}20`} />
    <text x="418" y="240" fill="#0d0d2b" fontFamily="Outfit" fontSize="8" fontWeight="600" textAnchor="middle">DONE</text>
    <rect x="16" y="254" width="568" height="30" rx="6" fill="white" stroke="rgba(167,183,231,0.1)" strokeWidth="1" />
    <text x="28" y="274" fill="#0d0d2b" fontFamily="Outfit" fontSize="10">03</text>
    <text x="52" y="274" fill="#222255" fontFamily="Outfit" fontSize="10">Personalized Question Bank</text>
    <rect x="400" y="262" width="36" height="16" rx="4" fill={`${color}20`} />
    <text x="418" y="274" fill="#0d0d2b" fontFamily="Outfit" fontSize="8" fontWeight="600" textAnchor="middle">DONE</text>
    <rect x="16" y="288" width="568" height="30" rx="6" fill="white" stroke="rgba(167,183,231,0.1)" strokeWidth="1" />
    <text x="28" y="308" fill="#0d0d2b" fontFamily="Outfit" fontSize="10">04</text>
    <text x="52" y="308" fill="#222255" fontFamily="Outfit" fontSize="10">Day-by-Day Prep Plan</text>
    <rect x="400" y="296" width="36" height="16" rx="4" fill={`${color}20`} />
    <text x="418" y="308" fill="#0d0d2b" fontFamily="Outfit" fontSize="8" fontWeight="600" textAnchor="middle">DONE</text>
    <rect x="16" y="322" width="568" height="1" fill="rgba(167,183,231,0.12)" />
    <text x="28" y="344" fill="#3d3d70" fontFamily="Outfit" fontSize="10">Generated in 23 seconds · 6 sections · 14 pages · Ready for print</text>
  </svg>
)

const PrivacyMockup = ({ color }) => (
  <svg viewBox="0 0 600 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="preview-mockup">
    <rect x="0" y="0" width="600" height="360" rx="16" fill="#F5F7FF" stroke="rgba(167,183,231,0.2)" strokeWidth="1" />
    <rect x="0" y="0" width="600" height="48" rx="16" fill="rgba(167,183,231,0.08)" />
    <rect x="0" y="32" width="600" height="16" fill="rgba(167,183,231,0.08)" />
    <circle cx="20" cy="24" r="6" fill="#FF5F57" />
    <circle cx="40" cy="24" r="6" fill="#FEBC2E" />
    <circle cx="60" cy="24" r="6" fill="#28C840" />
    <text x="88" y="28" fill="#0d0d2b" fontFamily="Outfit" fontSize="12" fontWeight="600">Security Dashboard</text>
    <Shield size={14} x={520} y={18} color={color} />
    <text x={540} y={29} fill={color} fontFamily="Outfit" fontSize="10" fontWeight="600">Protected</text>
    <rect x="16" y="60" width="175" height="80" rx="10" fill={`${color}10`} stroke={`${color}20`} strokeWidth="1" />
    <Shield size={20} x={28} y={70} color={color} />
    <text x="58" y="88" fill="#0d0d2b" fontFamily="Outfit" fontSize="11" fontWeight="700">Zero Retention</text>
    <text x="28" y="108" fill="#222255" fontFamily="Outfit" fontSize="9">Data processed in-memory</text>
    <text x="28" y="123" fill="#222255" fontFamily="Outfit" fontSize="9">No disk writes ever</text>
    <rect x="202" y="60" width="175" height="80" rx="10" fill={`${color}10`} stroke={`${color}20`} strokeWidth="1" />
    <svg x={214} y={70} width="20" height="20">
      <rect x="0" y="0" width="20" height="20" rx="4" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M3 10l5 5 9-9" stroke={color} strokeWidth="1.5" />
    </svg>
    <text x="244" y="88" fill="#0d0d2b" fontFamily="Outfit" fontSize="11" fontWeight="700">AES-256 Encryption</text>
    <text x="214" y="108" fill="#222255" fontFamily="Outfit" fontSize="9">End-to-end encrypted</text>
    <text x="214" y="123" fill="#222255" fontFamily="Outfit" fontSize="9">In transit &amp; at rest</text>
    <rect x="388" y="60" width="196" height="80" rx="10" fill={`${color}10`} stroke={`${color}20`} strokeWidth="1" />
    <svg x={400} y={70} width="20" height="20">
      <circle cx="10" cy="10" r="9" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M10 4v6l4 2" stroke={color} strokeWidth="1.5" />
    </svg>
    <text x="430" y="88" fill="#0d0d2b" fontFamily="Outfit" fontSize="11" fontWeight="700">SOC2 In Progress</text>
    <text x="400" y="108" fill="#222255" fontFamily="Outfit" fontSize="9">Type II audit underway</text>
    <text x="400" y="123" fill="#222255" fontFamily="Outfit" fontSize="9">Enterprise-ready</text>
    <rect x="16" y="152" width="568" height="1" fill="rgba(167,183,231,0.12)" />
    <rect x="16" y="164" width="568" height="44" rx="8" fill="white" stroke="rgba(167,183,231,0.1)" strokeWidth="1" />
    <text x="28" y="184" fill="#0d0d2b" fontFamily="Outfit" fontSize="11" fontWeight="600">Data Processing Pipeline</text>
    <text x="480" y="184" fill="#28C840" fontFamily="Outfit" fontSize="10" fontWeight="600">Active</text>
    <rect x="16" y="216" width="120" height="36" rx="6" fill="white" stroke="rgba(167,183,231,0.1)" strokeWidth="1" />
    <text x="28" y="230" fill="#3d3d70" fontFamily="Outfit" fontSize="9">1. Upload</text>
    <text x="76" y="238" fill="#28C840" fontFamily="Outfit" fontSize="10">✓</text>
    <rect x="144" y="216" width="120" height="36" rx="6" fill="white" stroke="rgba(167,183,231,0.1)" strokeWidth="1" />
    <text x="156" y="230" fill="#3d3d70" fontFamily="Outfit" fontSize="9">2. Parse</text>
    <text x="204" y="238" fill="#28C840" fontFamily="Outfit" fontSize="10">✓</text>
    <rect x="272" y="216" width="120" height="36" rx="6" fill="white" stroke="rgba(167,183,231,0.1)" strokeWidth="1" />
    <text x="284" y="230" fill="#3d3d70" fontFamily="Outfit" fontSize="9">3. Analyze</text>
    <text x="340" y="238" fill="#A7B7E7" fontFamily="Outfit" fontSize="10">⚡</text>
    <rect x="400" y="216" width="120" height="36" rx="6" fill="rgba(167,183,231,0.04)" stroke="rgba(167,183,231,0.06)" strokeWidth="1" strokeDasharray="4" />
    <text x="412" y="230" fill="#3d3d70" fontFamily="Outfit" fontSize="9">4. Delete</text>
    <text x="468" y="238" fill="#3d3d70" fontFamily="Outfit" fontSize="10">○</text>
    <text x="300" y="280" fill="#3d3d70" fontFamily="Outfit" fontSize="10" textAnchor="middle">Data is processed in-memory and immediately discarded after analysis</text>
    <text x="300" y="298" fill="#3d3d70" fontFamily="Outfit" fontSize="10" textAnchor="middle">No logs · No training data · No analytics on your content</text>
    <rect x="200" y="314" width="200" height="28" rx="8" fill={`${color}20`} />
    <text x="300" y="333" fill="#0d0d2b" fontFamily="Outfit" fontSize="11" fontWeight="600" textAnchor="middle">Delete My Data →</text>
  </svg>
)

const mockups = {
  analysis: AnalysisMockup,
  questions: QuestionsMockup,
  gaps: GapsMockup,
  plan: PlanMockup,
  reports: ReportsMockup,
  privacy: PrivacyMockup,
}

const CapabilityPreview = () => {
  const { capabilityId } = useParams()
  const navigate = useNavigate()
  const cap = capabilities.find(c => c.id === capabilityId)

  if (!cap) {
    return (
      <div className="preview-page">
        <header className="preview-nav">
          <button className="preview-nav__back" onClick={() => navigate('/')}>
            <ArrowLeft size={18} />
            Back
          </button>
        </header>
        <div className="preview-page__404">
          <h2>Capability not found</h2>
          <p>The preview you're looking for doesn't exist.</p>
          <button className="btn btn--primary" onClick={() => navigate('/')}>Return Home</button>
        </div>
      </div>
    )
  }

  const pc = cap.previewContent
  const Mockup = mockups[cap.id]

  return (
    <div className="preview-page" style={{ '--preview-accent': cap.color }}>
      <header className="preview-nav">
        <button className="preview-nav__back" onClick={() => navigate('/')}>
          <ArrowLeft size={18} />
          Back to Home
        </button>
        <div className="preview-nav__brand">
          <Logo size={24} />
        </div>
        <motion.button
          className="preview-nav__cta"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/register')}
        >
          Try It Free <Sparkles size={14} />
        </motion.button>
      </header>

      <main className="preview-main">
        <div className="preview-main__mockup">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <Mockup color={cap.color} />
          </motion.div>
        </div>

        <div className="preview-main__info">
          <motion.div
            className="preview-info"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="preview-info__icon" style={{ background: `${cap.color}15`, color: cap.color }}>
              <cap.icon size={28} />
            </div>
            <h1 className="preview-info__title">{cap.title}</h1>
            <p className="preview-info__desc">{cap.desc}</p>
          </motion.div>

          <motion.div
            className="preview-highlights"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.23, 1, 0.32, 1] }}
          >
            {pc.highlights.map((h, i) => (
              <div key={i} className="preview-highlight" style={{ background: `${cap.color}08`, borderColor: `${cap.color}15` }}>
                <span className="preview-highlight__value" style={{ color: cap.color }}>{h.value}</span>
                <span className="preview-highlight__label">{h.label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="preview-features"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            <h3 className="preview-features__title">Key Capabilities</h3>
            <ul className="preview-features__list">
              {pc.features.map((f, i) => (
                <li key={i} className="preview-features__item">
                  <span className="preview-features__dot" style={{ background: cap.color }} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="preview-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65, ease: [0.23, 1, 0.32, 1] }}
          >
            <motion.button
              className="btn btn--primary btn--lg"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/register')}
            >
              Try It Free <ArrowRight size={16} />
            </motion.button>
            <motion.button
              className="btn btn--ghost btn--lg"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/')}
            >
              Explore All Features
            </motion.button>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export default CapabilityPreview
