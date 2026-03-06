import { useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, MapPin, Calendar, Heart } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const sectionEntrance = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: 'easeOut' },
  viewport: { once: true, amount: 0.1 },
}

const experiences = [
  {
    title: 'Full Stack Developer Intern',
    company: 'eu research and development agency gmbh',
    location: 'Vienna, Austria',
    period: 'Oct 2025 – Present',
    current: true,
    color: 'from-indigo-500 to-purple-500',
    dotColor: 'bg-indigo-500',
    glowColor: 'rgba(99,102,241,0.3)',
    responsibilities: [
      'Developed scalable web applications from the ground up, leveraging modern frameworks and best practices.',
      'Managed and maintained company websites across 15+ projects, ensuring uptime, performance, and quality.',
      'Presented technical solutions and project updates to international partners and stakeholders.',
    ],
    tags: ['React', 'Node.js', 'REST APIs', 'JavaScript'],
  },
  {
    title: 'Machine Learning Developer',
    company: 'ICAM',
    location: 'Timisoara, Romania',
    period: 'Jul 2024 – Sep 2024',
    current: false,
    color: 'from-purple-500 to-pink-500',
    dotColor: 'bg-purple-500',
    glowColor: 'rgba(168,85,247,0.3)',
    responsibilities: [
      'Built a deep learning model in Python for handwritten Romanian text recognition using TensorFlow and OpenCV.',
      'Achieved 70% accuracy on a challenging multi-class classification task on real-world handwriting datasets.',
      'Designed and implemented a full data preprocessing and augmentation pipeline to improve model robustness.',
    ],
    tags: ['Python', 'TensorFlow', 'OpenCV', 'Deep Learning'],
  },
]

function GlowCard({ children, glowColor, className }) {
  const cardRef = useRef(null)
  const glowRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, ${glowColor}, transparent 60%)`
    }
  }, [glowColor])

  const handleMouseLeave = useCallback(() => {
    if (glowRef.current) {
      glowRef.current.style.background = 'transparent'
    }
  }, [])

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-2xl
        bg-white/70 dark:bg-[#1E293B]/60
        backdrop-blur-lg
        border border-white/80 dark:border-white/10
        shadow-lg shadow-slate-200/50 dark:shadow-xl dark:shadow-black/30
        transition-shadow duration-300
        ${className || ''}`}
    >
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none z-0 rounded-2xl transition-[background] duration-100"
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export default function Experience() {
  return (
    <motion.section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#0B0F19]" {...sectionEntrance}>
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-cyan-500 dark:text-cyan-400 font-medium mb-2 tracking-wider uppercase text-sm">My Journey</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">Experience</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto rounded-full" />
        </motion.div>

        {/* Timeline */}
        <div className="relative mb-16">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500/50 via-purple-500/30 to-transparent" />

          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: idx * 0.15 }}
                className={`relative flex flex-col sm:flex-row gap-6 ${
                  idx % 2 === 1 ? 'sm:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 sm:left-1/2 sm:-translate-x-1/2 top-6 w-4 h-4 rounded-full border-2 border-white dark:border-[#0B0F19] z-10 flex-shrink-0">
                  <div className={`w-full h-full rounded-full ${exp.dotColor} shadow-lg`} />
                </div>

                {/* Spacer for desktop */}
                <div className="hidden sm:block sm:w-1/2" />

                {/* Card */}
                <div className="pl-14 sm:pl-0 sm:w-1/2">
                  <GlowCard glowColor={exp.glowColor} className="hover:border-indigo-500/40 hover:shadow-indigo-500/5 p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-slate-900 dark:text-white font-bold text-lg leading-tight">{exp.title}</h3>
                          {exp.current && (
                            <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium px-2 py-0.5 rounded-full border border-emerald-500/20">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                              Current
                            </span>
                          )}
                        </div>
                        <p className={`font-semibold text-sm bg-gradient-to-r ${exp.color} bg-clip-text text-transparent`}>
                          {exp.company}
                        </p>
                      </div>
                      <Briefcase size={20} className="text-slate-400 dark:text-slate-500 flex-shrink-0 mt-1" />
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-3 mb-4">
                      <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs">
                        <MapPin size={12} className="text-indigo-500 dark:text-indigo-400" />
                        {exp.location}
                      </span>
                      <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs">
                        <Calendar size={12} className="text-indigo-500 dark:text-indigo-400" />
                        {exp.period}
                      </span>
                    </div>

                    {/* Responsibilities */}
                    <ul className="space-y-2 mb-4">
                      {exp.responsibilities.map((r, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0 mt-2" />
                          {r}
                        </li>
                      ))}
                    </ul>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 text-xs font-medium px-2.5 py-1 rounded-lg border border-indigo-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </GlowCard>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Volunteering */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-shrink-0 p-2 rounded-xl bg-rose-500/10 border border-rose-500/20">
              <Heart size={18} className="text-rose-500 dark:text-rose-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Volunteering</h3>
          </div>

          <GlowCard glowColor="rgba(244,63,94,0.25)" className="hover:border-rose-500/30 hover:shadow-rose-500/5 p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h4 className="text-slate-900 dark:text-white font-bold text-lg leading-tight">
                    Cultural Heritage &amp; Job Orientation
                  </h4>
                  <span className="inline-flex items-center bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-medium px-2 py-0.5 rounded-full border border-rose-500/20">
                    Volunteer
                  </span>
                </div>

                <p className="font-semibold text-sm bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent mb-3">
                  YouthNow
                </p>

                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs">
                    <MapPin size={12} className="text-rose-500 dark:text-rose-400" />
                    Beirut, Lebanon
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs">
                    <Calendar size={12} className="text-rose-500 dark:text-rose-400" />
                    2018 – 2019
                  </span>
                </div>

                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Volunteered with YouthNow on cultural heritage preservation and job orientation programs,
                  helping young people in Beirut discover career paths and connect with their cultural roots.
                </p>
              </div>

              <div className="text-3xl flex-shrink-0">🤝</div>
            </div>
          </GlowCard>
        </motion.div>
      </div>
    </motion.section>
  )
}
