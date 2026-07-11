import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const progress = useTransform(scrollYProgress, [0, 1], [0, 100])
  const smooth = useSpring(progress, { stiffness: 100, damping: 30 })
  return (
    <motion.div className="scroll-progress" style={{ scaleX: smooth }} aria-hidden="true" />
  )
}
