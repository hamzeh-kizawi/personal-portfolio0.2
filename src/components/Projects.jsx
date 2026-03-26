import { useRef, useCallback, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, ExternalLink, FolderOpen, Play, X, Images, ChevronLeft, ChevronRight } from 'lucide-react'

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
    githubUrl: 'https://github.com/hamzeh-kizawi/shoes-website',
    liveUrl: 'https://render-flask-shoes-website.onrender.com/',
  },
  {
    title: 'Cars Application',
    description:
      'A modern car dealership platform that integrates an AI-powered chat assistant built with RAG to help users quickly find the right vehicles without wasting time. The platform also includes a community discussion page where users can share insights, compare car options, and engage with others.',
    tags: ['React', 'JavaScript', 'CSS', 'REST API'],
    emoji: '🚗',
    accentColor: 'rgba(139,92,246,0.35)',
    githubUrl: 'https://github.com/hamzeh-kizawi/React-car-website',
    liveUrl: null,
    videoUrl: 'https://www.youtube.com/embed/aujJ6sjMDAM?autoplay=1&mute=1',
  },
  {
    title: 'Dashboard',
    description:
      'A startup internal platform built for my company and its sub-companies to centralize operations — tracking tasks, expenses, analytics, vacations, messages, and more. Designed to scale beyond a single organization. Still under active development.',
    tags: ['React', 'Node.js', 'MongoDB', 'Analytics', 'Dashboard'],
    emoji: '📊',
    accentColor: 'rgba(6,182,212,0.35)',
    liveUrl: null,
    underDevelopment: true,
    thumbnail: '/dashboard-main.png',
    images: [
      { src: '/dashboard-main.png', label: 'Main Dashboard' },
      { src: '/operations-tab.png', label: 'Operations' },
      { src: '/tasks-tab.png', label: 'Tasks' },
      { src: '/expenses-tab.png', label: 'Expenses' },
      { src: '/analytics-tab.png', label: 'Analytics' },
      { src: '/calendar-tab.png', label: 'Calendar' },
      { src: '/messages-tab.png', label: 'Messages' },
      { src: '/vaction-tab.png', label: 'Vacations' },
      { src: '/activatiylog-tab.png', label: 'Activity Log' },
    ],
  },
]

const headingWords = ['Projects']

function ProjectCard({ project, idx, onPlayVideo, onOpenGallery }) {
  const cardRef = useRef(null)
  const glowRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, ${project.accentColor}, transparent 60%)`
    }
  }, [project.accentColor])

  const handleMouseLeave = useCallback(() => {
    if (glowRef.current) {
      glowRef.current.style.background = 'transparent'
    }
  }, [])

  return (
    <motion.div
      ref={cardRef}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: idx * 0.1 } },
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-2xl flex flex-col overflow-hidden
        bg-white/70 dark:bg-white/5
        backdrop-blur-xl
        border border-white/80 dark:border-white/10
        shadow-lg shadow-slate-200/50 dark:shadow-xl dark:shadow-black/30
        transition-shadow duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-500/10"
    >
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-2xl pointer-events-none z-0 transition-[background] duration-100"
      />

      {project.thumbnail && (
        <div
          className="relative z-10 w-full h-44 overflow-hidden cursor-pointer"
          onClick={() => onOpenGallery(project.images)}
        >
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white text-sm font-medium flex items-center gap-2">
              <Images size={16} />
              View Screenshots
            </span>
          </div>
        </div>
      )}

      <div className="relative z-10 p-6 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-4xl">{project.emoji}</span>
            {project.underDevelopment && (
              <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-medium px-2 py-0.5 rounded-full border border-amber-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                In Development
              </span>
            )}
          </div>
          <FolderOpen size={20} className="text-slate-400 dark:text-slate-500 group-hover:text-emerald-500 transition-colors" />
        </div>

        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{project.title}</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-5 flex-grow">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 text-xs font-medium px-2.5 py-1 rounded-lg border border-emerald-500/20"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-3 flex-wrap">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-700 dark:text-slate-300 text-sm font-medium px-4 py-2 rounded-lg border border-slate-200 dark:border-white/10 transition-all duration-200"
            >
              <Github size={15} />
              GitHub
            </a>
          )}
          {project.images ? (
            <button
              onClick={() => onOpenGallery(project.images)}
              className="inline-flex items-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium px-4 py-2 rounded-lg border border-emerald-500/30 transition-colors cursor-pointer"
            >
              <Images size={15} />
              Screenshots
            </button>
          ) : project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500/80 hover:bg-emerald-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200"
            >
              <ExternalLink size={15} />
              Live Demo
            </a>
          ) : project.videoUrl ? (
            <button
              onClick={() => onPlayVideo(project.videoUrl)}
              className="inline-flex items-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium px-4 py-2 rounded-lg border border-emerald-500/30 transition-colors cursor-pointer"
            >
              <Play size={15} />
              Play Video
            </button>
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
  const [videoModal, setVideoModal] = useState(null)
  const [gallery, setGallery] = useState(null)
  const [galleryIndex, setGalleryIndex] = useState(0)

  const openGallery = (images) => {
    setGallery(images)
    setGalleryIndex(0)
  }

  const closeGallery = () => setGallery(null)

  const prev = () => setGalleryIndex(i => (i - 1 + gallery.length) % gallery.length)
  const next = () => setGalleryIndex(i => (i + 1) % gallery.length)

  useEffect(() => {
    if (!gallery) return
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape') closeGallery()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [gallery, galleryIndex])

  return (
    <motion.section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#0B0F19]" {...sectionEntrance}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            className="text-emerald-500 dark:text-emerald-400 font-medium mb-2 tracking-wider uppercase text-sm"
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
            className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-violet-500 mx-auto rounded-full origin-left"
          />
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-6 mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.title}
              project={project}
              idx={idx}
              onPlayVideo={setVideoModal}
              onOpenGallery={openGallery}
            />
          ))}
        </motion.div>

        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white/80 dark:border-white/10 rounded-2xl px-8 py-5 shadow-lg shadow-slate-200/50 dark:shadow-xl dark:shadow-black/30">
            <Github size={20} className="text-emerald-500 dark:text-emerald-400" />
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Looking for more? Check out my{' '}
              <a
                href="https://github.com/hamzeh-kizawi?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-500 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-300 font-semibold underline underline-offset-2 transition-colors"
              >
                GitHub repositories
              </a>{' '}
              for additional source code and projects.
            </p>
          </div>
        </motion.div>
      </div>

      {videoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setVideoModal(null)}
        >
          <div className="relative w-full max-w-4xl mx-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setVideoModal(null)}
              className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
              <iframe
                src={videoModal}
                className="absolute inset-0 w-full h-full rounded-xl"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {gallery && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeGallery}
        >
          <div className="relative w-full max-w-5xl mx-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeGallery}
              className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors z-10"
            >
              <X size={24} />
            </button>

            <div className="relative">
              <img
                src={gallery[galleryIndex].src}
                alt={gallery[galleryIndex].label}
                className="w-full max-h-[75vh] object-contain rounded-xl"
              />

              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <div className="mt-3 flex items-center justify-between px-1">
              <span className="text-white/80 text-sm font-medium">{gallery[galleryIndex].label}</span>
              <span className="text-white/50 text-sm">{galleryIndex + 1} / {gallery.length}</span>
            </div>

            <div className="mt-3 flex gap-1.5 justify-center flex-wrap">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setGalleryIndex(i)}
                  className={`w-12 h-8 rounded overflow-hidden border-2 transition-all ${
                    i === galleryIndex ? 'border-emerald-400 opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                >
                  <img src={img.src} alt={img.label} className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.section>
  )
}
