import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      smoothWheel: true,
      autoRaf: true,
    })

    return () => {
      lenis.destroy()
    }
  }, [])

  return children
}
