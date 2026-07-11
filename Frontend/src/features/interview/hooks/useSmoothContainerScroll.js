import { useEffect } from 'react'
import Lenis from 'lenis'

export function useSmoothContainerScroll(selector) {
  useEffect(() => {
    // Small delay so DOM elements exist after React render
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll(selector)
      if (!elements.length) return

      const lenis = new Lenis({
        lenis: Array.from(elements),
        lerp: 0.08,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      })

      // Store for cleanup
      window.__interviewLenis = lenis

      return () => {
        lenis.destroy()
        window.__interviewLenis = null
      }
    }, 100)

    return () => {
      clearTimeout(timer)
      if (window.__interviewLenis) {
        window.__interviewLenis.destroy()
        window.__interviewLenis = null
      }
    }
  }, [selector])
}
