import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useMediaQuery } from '../hooks/useMediaQuery'

export default function AuroraBackground({ isDark }) {
  const isMobile = useMediaQuery('(max-width: 767px)')

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 })

  useEffect(() => {
    if (isMobile) return // no parallax on mobile
    const move = (e) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      mouseX.set((e.clientX - cx) * 0.08)
      mouseY.set((e.clientY - cy) * 0.08)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [isMobile, mouseX, mouseY])

  // Orb opacity is reduced on mobile for better scroll FPS
  const orb1Opacity = isMobile ? 0.10 : 0.18
  const orb2Opacity = isMobile ? 0.09 : 0.16
  const orb1OpacityLight = isMobile ? 0.08 : 0.14
  const orb2OpacityLight = isMobile ? 0.07 : 0.12

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {isDark ? (
        <>
          {/* Orb 1 — cyan */}
          <motion.div style={{ x: springX, y: springY }} className="absolute">
            <div
              className="absolute rounded-full"
              style={{
                width: 700,
                height: 700,
                top: '-15%',
                left: '-10%',
                background: `radial-gradient(circle, rgba(6,182,212,${orb1Opacity}) 0%, transparent 70%)`,
                animation: 'aurora-drift-1 18s ease-in-out infinite',
                willChange: 'transform',
              }}
            />
          </motion.div>

          {/* Orb 2 — indigo */}
          <motion.div style={{ x: springX, y: springY }}>
            <div
              className="absolute rounded-full"
              style={{
                width: 800,
                height: 800,
                bottom: '-20%',
                right: '-15%',
                background: `radial-gradient(circle, rgba(99,102,241,${orb2Opacity}) 0%, transparent 70%)`,
                animation: 'aurora-drift-2 22s ease-in-out infinite',
                willChange: 'transform',
              }}
            />
          </motion.div>

          {/* Conic spin layer — desktop only */}
          {!isMobile && (
            <div
              className="absolute"
              style={{
                width: 600,
                height: 600,
                top: '30%',
                left: '40%',
                transform: 'translate(-50%, -50%)',
                background: 'conic-gradient(from 0deg, rgba(6,182,212,0.06), rgba(99,102,241,0.06), rgba(6,182,212,0.06))',
                borderRadius: '50%',
                animation: 'aurora-spin 30s linear infinite',
                willChange: 'transform',
              }}
            />
          )}
        </>
      ) : (
        <>
          {/* Orb 1 — lavender */}
          <motion.div style={{ x: springX, y: springY }}>
            <div
              className="absolute rounded-full"
              style={{
                width: 700,
                height: 700,
                top: '-15%',
                left: '-10%',
                background: `radial-gradient(circle, rgba(139,92,246,${orb1OpacityLight}) 0%, transparent 70%)`,
                animation: 'aurora-drift-1 18s ease-in-out infinite',
                willChange: 'transform',
              }}
            />
          </motion.div>

          {/* Orb 2 — coral */}
          <motion.div style={{ x: springX, y: springY }}>
            <div
              className="absolute rounded-full"
              style={{
                width: 800,
                height: 800,
                bottom: '-20%',
                right: '-15%',
                background: `radial-gradient(circle, rgba(251,146,60,${orb2OpacityLight}) 0%, transparent 70%)`,
                animation: 'aurora-drift-2 22s ease-in-out infinite',
                willChange: 'transform',
              }}
            />
          </motion.div>

          {/* Conic spin layer — desktop only */}
          {!isMobile && (
            <div
              className="absolute"
              style={{
                width: 600,
                height: 600,
                top: '30%',
                left: '40%',
                transform: 'translate(-50%, -50%)',
                background: 'conic-gradient(from 0deg, rgba(139,92,246,0.05), rgba(251,146,60,0.05), rgba(139,92,246,0.05))',
                borderRadius: '50%',
                animation: 'aurora-spin 30s linear infinite',
                willChange: 'transform',
              }}
            />
          )}
        </>
      )}
    </div>
  )
}
