import { Suspense, useRef } from 'react'
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'
import { Download, Mail, ArrowDown, Github } from 'lucide-react'
import { Canvas } from '@react-three/fiber'
import FloatingShapes from './FloatingShapes'
import { useTheme } from '../context/ThemeContext'

function CanvasFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 animate-spin" />
    </div>
  )
}

function MagneticButton({ children, className, ...props }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 15 })
  const springY = useSpring(y, { stiffness: 200, damping: 15 })

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * 0.35)
    y.set((e.clientY - cy) * 0.35)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      {typeof children === 'function'
        ? children()
        : <div className={className} {...props}>{children}</div>
      }
    </motion.div>
  )
}

const nameChars = 'Hamzeh Kizawi'.split('')

export default function Hero({ canvasReady = false }) {
  const { isDark } = useTheme()
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const canvasY = useTransform(scrollYProgress, [0, 1], [0, 60])

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center py-24 pt-28">

        <motion.div
          style={{ y: textY }}
          className="flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-7"
          >
            <div className="relative inline-block">
              <div className="w-36 h-36 rounded-full p-1 bg-gradient-to-br from-cyan-500 via-indigo-500 to-purple-500 shadow-2xl shadow-indigo-500/30">
                <img
                  src="/My-picture.jpeg"
                  alt="Hamzeh Kizawi"
                  className="w-full h-full rounded-full object-cover object-top"
                />
              </div>
              <span className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white dark:border-[#0B0F19]" />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-cyan-500 dark:text-cyan-400 font-medium text-lg mb-2 tracking-wide"
          >
            Hello, I'm
          </motion.p>

          <motion.h1
            className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-4"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.04, delayChildren: 0.3 } } }}
          >
            {nameChars.map((char, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
                }}
                className={
                  char === ' '
                    ? 'inline-block w-4'
                    : i < 6
                    ? 'inline-block bg-gradient-to-r from-slate-900 via-slate-700 to-slate-600 dark:from-white dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent'
                    : 'inline-block bg-gradient-to-r from-cyan-500 to-indigo-500 bg-clip-text text-transparent'
                }
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 font-light mb-8 max-w-md"
          >
            Creative Full Stack Developer &amp; Tech Enthusiast
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8"
          >
            <MagneticButton>
              <a
                href="/Hamzeh-Kizawi-CV.pdf"
                download
                className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/30 active:scale-95"
              >
                <Download size={17} />
                Download Resume
              </a>
            </MagneticButton>
            <MagneticButton>
              <button
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 border border-cyan-500 text-cyan-500 dark:text-cyan-400 hover:bg-cyan-500/10 font-semibold px-6 py-3 rounded-xl transition-all duration-200 active:scale-95"
              >
                <Mail size={17} />
                Get in Touch
              </button>
            </MagneticButton>
          </motion.div>

          <motion.a
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            href="https://github.com/hamzeh-kizawi?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 text-sm transition-colors duration-200"
          >
            <Github size={15} />
            github.com/hamzeh-kizawi
          </motion.a>
        </motion.div>

        <motion.div
          style={{ y: canvasY }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: canvasReady ? 1 : 0, scale: canvasReady ? 1 : 0.9 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="hidden md:block h-[420px] lg:h-[520px] w-full"
        >
          {canvasReady && (
            <Suspense fallback={<CanvasFallback />}>
              <Canvas
                camera={{ position: [0, 0, 6], fov: 55 }}
                dpr={[1, 1.5]}
                gl={{ alpha: true, antialias: true }}
                style={{ background: 'transparent' }}
              >
                <FloatingShapes isDark={isDark} />
              </Canvas>
            </Suspense>
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.5, duration: 1.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 dark:text-slate-600"
      >
        <ArrowDown size={22} />
      </motion.div>
    </section>
  )
}
