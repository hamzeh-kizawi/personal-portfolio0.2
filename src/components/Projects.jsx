import { useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Github, ExternalLink, FolderOpen } from 'lucide-react'

const sectionEntrance = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: 'easeOut' },
  viewport: { once: true, amount: 0.1 },
}

const projects = [
  {
    title: 'Shoes Shop',
    description:
      'A fully custom e-commerce web application for a shoes store. Built with Python Flask on the backend, featuring a custom-designed storefront, product catalog, shopping cart functionality, and a clean, responsive UI.',
    tags: ['Python', 'Flask', 'HTML', 'CSS', 'JavaScript'],
    emoji: '👟',
    accentColor: 'rgba(99,102,241,0.35)',
    githubUrl: 'https://github.com/hamzeh-kizawi?tab=repositories',
    liveUrl: null,
  },
  {
    title: 'Cars Application',
    description:
      'A full-featured React graduation project — a car browsing and management application. Includes dynamic listing, filtering, and detailed views for vehicles. Built with React for the frontend and showcases advanced component architecture.',
    tags: ['React', 'JavaScript', 'CSS', 'REST API'],
    emoji: '🚗',
    accentColor: 'rgba(139,92,246,0.35)',
    githubUrl: 'https://github.com/hamzeh-kizawi?tab=repositories',
    liveUrl: null,
  },
]

const headingWords = ['Projects']

function TiltCard({ project, idx }) {
  const cardRef = useRef(null)
  const glowRef = useRef(null)

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 })
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 })

  const handleMouseMove = useCallback((e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    rotateY.set((x - cx) / cx * 15)
    rotateX.set((cy - y) / cy * 15)

    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, ${project.accentColor}, transparent 60%)`
    }
  }, [rotateX, rotateY, project.accentColor])

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
    if (glowRef.current) {
      glowRef.current.style.background = 'transparent'
    }
  }, [rotateX, rotateY])

  return (
    <motion.div
      ref={cardRef}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: idx * 0.1 } },
      }}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 1200,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-2xl flex flex-col overflow-hidden
        bg-white/70 dark:bg-white/5
        backdrop-blur-xl
        border border-white/80 dark:border-white/10
        shadow-lg shadow-slate-200/50 dark:shadow-xl dark:shadow-black/30
        transition-shadow duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/10"
    >
      {/* Glow overlay */}
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-2xl pointer-events-none z-0 transition-[background] duration-100"
      />

      <div className="relative z-10 p-6 flex flex-col h-full">
        {/* Card Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-4xl">{project.emoji}</span>
          <FolderOpen size={20} className="text-slate-400 dark:text-slate-500 group-hover:text-indigo-500 transition-colors" />
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{project.title}</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-5 flex-grow">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 text-xs font-medium px-2.5 py-1 rounded-lg border border-indigo-500/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-700 dark:text-slate-300 text-sm font-medium px-4 py-2 rounded-lg border border-slate-200 dark:border-white/10 transition-all duration-200"
          >
            <Github size={15} />
            GitHub
          </a>
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-cyan-500/80 hover:bg-cyan-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200"
            >
              <ExternalLink size={15} />
              Live Demo
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 bg-slate-100/50 dark:bg-white/5 text-slate-400 dark:text-slate-600 text-sm font-medium px-4 py-2 rounded-lg border border-slate-200 dark:border-white/10 cursor-not-allowed">
              <ExternalLink size={15} />
              Coming Soon
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <motion.section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#0B0F19]" {...sectionEntrance}>
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            className="text-cyan-500 dark:text-cyan-400 font-medium mb-2 tracking-wider uppercase text-sm"
          >
            What I've built
          </motion.p>
          <motion.h2
            className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4"
            variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
          >
            {headingWords.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-3"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>
          <motion.div
            variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.5, delay: 0.2 } } }}
            className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto rounded-full origin-left"
          />
        </motion.div>

        {/* Project Cards */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project, idx) => (
            <TiltCard key={project.title} project={project} idx={idx} />
          ))}
        </motion.div>

        {/* GitHub Note */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white/80 dark:border-white/10 rounded-2xl px-8 py-5 shadow-lg shadow-slate-200/50 dark:shadow-xl dark:shadow-black/30">
            <Github size={20} className="text-cyan-500 dark:text-cyan-400" />
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Looking for more? Check out my{' '}
              <a
                href="https://github.com/hamzeh-kizawi?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-500 dark:text-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-300 font-semibold underline underline-offset-2 transition-colors"
              >
                GitHub repositories
              </a>{' '}
              for additional source code and projects.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
