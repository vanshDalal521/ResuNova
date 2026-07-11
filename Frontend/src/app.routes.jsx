import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Profile from "./features/auth/pages/Profile";
import Protected from "./features/auth/components/Protected";
import Home from "./features/interview/pages/Home";
import Interview from "./features/interview/pages/Interview";
import Landing from "./features/landing/pages/Landing";
import CapabilityPreview from "./features/landing/pages/CapabilityPreview";
import PaymentSuccess from "./features/payment/pages/Success";
import PaymentCancel from "./features/payment/pages/Cancel";
import {
    Integrations, Changelog, Roadmap, ApiDocs,
    About, Blog, Careers, Press, PartnerProgram,
    InterviewGuides, SalaryData, CompanyDatabase, Community,
    Webinars, Templates, Privacy, Terms, Security, Cookies, GDPR, DPA,
} from "./features/landing/pages/static/pages.jsx";
import FeaturesPage from "./features/landing/pages/static/FeaturesPage.jsx";
import PricingPage from "./features/landing/pages/static/PricingPage.jsx";
import ContactPage from "./features/landing/pages/static/ContactPage.jsx";

export const router = createBrowserRouter([
    { path: "/", element: <Landing /> },
    { path: "/dashboard", element: <Protected><Home /></Protected> },
    { path: "/profile", element: <Protected><Profile /></Protected> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/interview/:interviewId", element: <Protected><Interview /></Protected> },
    { path: "/preview/:capabilityId", element: <CapabilityPreview /> },
    { path: "/payment/success", element: <Protected><PaymentSuccess /></Protected> },
    { path: "/payment/cancel", element: <Protected><PaymentCancel /></Protected> },
    { path: "/features", element: <FeaturesPage /> },
    { path: "/pricing", element: <PricingPage /> },
    { path: "/integrations", element: <Integrations /> },
    { path: "/changelog", element: <Changelog /> },
    { path: "/roadmap", element: <Roadmap /> },
    { path: "/api-docs", element: <ApiDocs /> },
    { path: "/about", element: <About /> },
    { path: "/blog", element: <Blog /> },
    { path: "/careers", element: <Careers /> },
    { path: "/press", element: <Press /> },
    { path: "/contact", element: <ContactPage /> },
    { path: "/partner-program", element: <PartnerProgram /> },
    { path: "/interview-guides", element: <InterviewGuides /> },
    { path: "/salary-data", element: <SalaryData /> },
    { path: "/company-database", element: <CompanyDatabase /> },
    { path: "/community", element: <Community /> },
    { path: "/webinars", element: <Webinars /> },
    { path: "/templates", element: <Templates /> },
    { path: "/privacy", element: <Privacy /> },
    { path: "/terms", element: <Terms /> },
    { path: "/security", element: <Security /> },
    { path: "/cookies", element: <Cookies /> },
    { path: "/gdpr", element: <GDPR /> },
    { path: "/dpa", element: <DPA /> },
])
