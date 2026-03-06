import { motion } from 'framer-motion'
import { Monitor, Server, Cpu } from 'lucide-react'

const sectionEntrance = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: 'easeOut' },
  viewport: { once: true, amount: 0.1 },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.07 } },
}

const skillBadge = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
}

const categories = [
  {
    icon: Monitor,
    title: 'Frontend',
    color: 'text-sky-500 dark:text-sky-400',
    borderColor: 'border-sky-500/30',
    bgColor: 'bg-sky-500/5',
    badgeColor: 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/20',
    skills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Responsive Design', 'Tailwind CSS', 'Vite'],
  },
  {
    icon: Server,
    title: 'Backend',
    color: 'text-emerald-600 dark:text-emerald-400',
    borderColor: 'border-emerald-500/30',
    bgColor: 'bg-emerald-500/5',
    badgeColor: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20',
    skills: ['Python', 'Java', 'Flask', 'RESTful APIs', 'MySQL', 'Node.js'],
  },
  {
    icon: Cpu,
    title: 'ML & Tools',
    color: 'text-purple-600 dark:text-purple-400',
    borderColor: 'border-purple-500/30',
    bgColor: 'bg-purple-500/5',
    badgeColor: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20',
    skills: ['TensorFlow', 'OpenCV', 'Git', 'GitHub', 'Deep Learning', 'Data Preprocessing'],
  },
]

export default function Skills() {
  return (
    <motion.section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#0a1120]" {...sectionEntrance}>
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-indigo-500 dark:text-indigo-400 font-medium mb-2 tracking-wider uppercase text-sm">What I work with</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">Skills</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        {/* Skill Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon
            return (
              <motion.div
                key={cat.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`${cat.bgColor} rounded-2xl border ${cat.borderColor} p-6 hover:shadow-xl transition-all duration-300`}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`p-2 rounded-xl ${cat.bgColor} border ${cat.borderColor}`}>
                    <Icon size={22} className={cat.color} />
                  </div>
                  <h3 className="text-slate-900 dark:text-white font-bold text-lg">{cat.title}</h3>
                </div>

                {/* Badges */}
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-wrap gap-2"
                >
                  {cat.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      variants={skillBadge}
                      whileHover={{ scale: 1.08 }}
                      className={`text-xs font-medium px-3 py-1.5 rounded-lg border ${cat.badgeColor} cursor-default transition-transform duration-150`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}
