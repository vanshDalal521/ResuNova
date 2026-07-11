import { RouterProvider } from "react-router"
import { router } from "./app.routes.jsx"
import { AuthProvider } from "./features/auth/auth.context.jsx"
import { InterviewProvider } from "./features/interview/interview.context.jsx"
import SmoothScroll from "./components/SmoothScroll"

function App() {
  return (
    <AuthProvider>
      <InterviewProvider>
        <div className="liquid-bg">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>
        <SmoothScroll>
          <RouterProvider router={router} />
        </SmoothScroll>
      </InterviewProvider>
    </AuthProvider>
  )
}

export default App
