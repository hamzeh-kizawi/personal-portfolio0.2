import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Languages, Sparkles, Coffee, Music, ChefHat, Plane } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
}

const sectionEntrance = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: 'easeOut' },
  viewport: { once: true, amount: 0.1 },
}

const education = [
  {
    degree: 'BSc Computer Science',
    school: 'West University of Timisoara',
    location: 'Timisoara, Romania',
    detail: 'Main campus — core studies in software engineering, algorithms, and data structures.',
    icon: '🎓',
  },
  {
    degree: 'Erasmus Exchange Program',
    school: 'JKU Johannes Kepler University',
    location: 'Linz, Austria',
    detail: 'International exchange semester focusing on advanced computing topics in a European academic environment.',
    icon: '🌍',
  },
]

const languages = [
  { lang: 'Arabic', level: 'Native', percent: 100 },
  { lang: 'English', level: 'C1 — Advanced', percent: 85 },
  { lang: 'Romanian', level: 'B2 — Upper Intermediate', percent: 65 },
]

const funFacts = [
  { icon: Music, label: 'Plays Piano', color: 'text-purple-500 dark:text-purple-400', bg: 'bg-purple-500/10' },
  { icon: ChefHat, label: 'Good Chef', color: 'text-orange-500 dark:text-orange-400', bg: 'bg-orange-500/10' },
  { icon: Plane, label: 'World Traveler', color: 'text-sky-500 dark:text-sky-400', bg: 'bg-sky-500/10' },
  { icon: Coffee, label: 'Coffee Lover', color: 'text-amber-500 dark:text-amber-400', bg: 'bg-amber-500/10' },
]

const HELP_OUTPUT = [
  { type: 'output', text: '┌─────────────────────────────────────────┐' },
  { type: 'output', text: '│         Available Commands              │' },
  { type: 'output', text: '├──────────────────┬──────────────────────┤' },
  { type: 'output', text: '│ help             │ Show this message     │' },
  { type: 'output', text: '│ cat skills.txt   │ List all skills       │' },
  { type: 'output', text: '│ run ml_model.py  │ Run ML simulation     │' },
  { type: 'output', text: '│ clear            │ Clear terminal        │' },
  { type: 'output', text: '└──────────────────┴──────────────────────┘' },
]

const SKILLS_OUTPUT = [
  { type: 'output', text: '# skills.txt' },
  { type: 'output', text: '' },
  { type: 'success', text: '[ Frontend ]' },
  { type: 'output', text: '  React · JavaScript · HTML5 · CSS3 · Tailwind CSS · Vite' },
  { type: 'success', text: '[ Backend ]' },
  { type: 'output', text: '  Python · Flask · Node.js · RESTful APIs · MySQL · Java' },
  { type: 'success', text: '[ ML & Tools ]' },
  { type: 'output', text: '  TensorFlow · OpenCV · Deep Learning · Git · GitHub' },
]

function Terminal() {
  const [history, setHistory] = useState([
    { type: 'system', text: 'Welcome! Type "help" to see available commands.' },
  ])
  const [input, setInput] = useState('')
  const [running, setRunning] = useState(false)
  const outputRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [history])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    const cmd = input.trim()
    if (!cmd || running) return
    setInput('')

    setHistory(h => [...h, { type: 'input', text: cmd }])

    if (cmd === 'clear') {
      setHistory([])
      return
    }

    if (cmd === 'help') {
      setHistory(h => [...h, ...HELP_OUTPUT])
      return
    }

    if (cmd === 'cat skills.txt') {
      setHistory(h => [...h, ...SKILLS_OUTPUT])
      return
    }

    if (cmd === 'run ml_model.py') {
      setRunning(true)
      setHistory(h => [...h, { type: 'output', text: 'Initializing TensorFlow...' }])
      setTimeout(() => {
        setHistory(h => [
          ...h,
          { type: 'output', text: 'Loading dataset...' },
          { type: 'output', text: 'Training model (epoch 1/5)...' },
        ])
        setTimeout(() => {
          setHistory(h => [
            ...h,
            { type: 'success', text: 'Model accuracy: 70%. Text successfully recognized!' },
          ])
          setRunning(false)
        }, 1000)
      }, 1500)
      return
    }

    setHistory(h => [
      ...h,
      { type: 'error', text: `bash: ${cmd}: command not found. Type 'help' for available commands.` },
    ])
  }, [input, running])

  return (
    <div
      className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40"
      onClick={() => inputRef.current?.focus()}
      style={{ cursor: 'text' }}
    >
      <div className="flex items-center gap-2 px-4 py-3 bg-[#1c1c1e] border-b border-white/10">
        <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
        <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
        <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
        <span className="ml-4 text-slate-400 text-xs font-mono">hamzeh@portfolio:~</span>
      </div>

      <div
        ref={outputRef}
        className="bg-[#0d1117]/95 backdrop-blur-xl p-4 font-mono text-sm overflow-y-auto"
        style={{ height: 280 }}
      >
        {history.map((line, i) => (
          <div key={i} className="leading-relaxed">
            {line.type === 'input' && (
              <p>
                <span className="text-cyan-400 select-none">$ </span>
                <span className="text-slate-100">{line.text}</span>
              </p>
            )}
            {line.type === 'output' && (
              <p className="text-slate-300 whitespace-pre">{line.text || '\u00A0'}</p>
            )}
            {line.type === 'success' && (
              <p className="text-emerald-400">{line.text}</p>
            )}
            {line.type === 'error' && (
              <p className="text-red-400">{line.text}</p>
            )}
            {line.type === 'system' && (
              <p className="text-slate-500 italic">{line.text}</p>
            )}
          </div>
        ))}
        {running && (
          <span className="inline-block w-2 h-4 bg-cyan-400 animate-pulse" />
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 px-4 py-3 bg-[#0d1117]/95 border-t border-white/10"
      >
        <span className="text-cyan-400 font-mono text-sm select-none flex-shrink-0">
          hamzeh@portfolio:~$
        </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={running}
          autoComplete="off"
          spellCheck={false}
          className="flex-1 bg-transparent text-slate-100 font-mono text-sm outline-none placeholder-slate-600 disabled:opacity-50"
          placeholder={running ? '' : 'type a command…'}
        />
      </form>
    </div>
  )
}

export default function About() {
  return (
    <motion.section
      id="about"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#0a1120]"
      {...sectionEntrance}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-indigo-500 dark:text-indigo-400 font-medium mb-2 tracking-wider uppercase text-sm">Who I am</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">About Me</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-200 dark:border-[#334155] p-8 mb-10 text-center max-w-3xl mx-auto"
        >
          <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
            I'm <span className="text-indigo-500 dark:text-indigo-400 font-semibold">Hamzeh</span>, a computer science enthusiast who navigates
            the maze of coding challenges with a keyboard in one hand and a cup of coffee in the other. When life throws
            you errors, sometimes all you need is a good punchline to fix everything.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 mb-14">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap className="text-indigo-500 dark:text-indigo-400" size={22} />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Education</h3>
            </div>
            <div className="space-y-4">
              {education.map((edu) => (
                <motion.div
                  key={edu.school}
                  variants={fadeUp}
                  className="bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-[#334155] p-5 hover:border-indigo-500/50 transition-colors duration-200"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl mt-0.5">{edu.icon}</span>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white text-sm">{edu.degree}</h4>
                      <p className="text-indigo-500 dark:text-indigo-400 text-sm font-medium">{edu.school}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{edu.location}</p>
                      <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 leading-relaxed">{edu.detail}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Languages className="text-indigo-500 dark:text-indigo-400" size={22} />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Languages</h3>
            </div>
            <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-[#334155] p-5 space-y-5">
              {languages.map((l) => (
                <motion.div key={l.lang} variants={fadeUp}>
                  <div className="flex justify-between items-baseline mb-1.5">
                    <span className="text-slate-800 dark:text-slate-200 font-medium text-sm">{l.lang}</span>
                    <span className="text-indigo-500 dark:text-indigo-400 text-xs font-medium">{l.level}</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${l.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                      className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="text-indigo-500 dark:text-indigo-400" size={22} />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Fun Facts</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {funFacts.map(({ icon: Icon, label, color, bg }) => (
                  <motion.div
                    key={label}
                    variants={fadeUp}
                    className={`${bg} border border-slate-200 dark:border-[#334155] rounded-xl p-3 flex items-center gap-3 hover:scale-105 transition-transform duration-200`}
                  >
                    <Icon size={20} className={color} />
                    <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">{label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-slate-400 dark:text-slate-500 font-mono text-sm">~/portfolio</span>
            <span className="text-slate-300 dark:text-slate-600 font-mono text-sm">—</span>
            <span className="text-emerald-500 dark:text-emerald-400 font-mono text-sm font-medium">interactive terminal</span>
          </div>
          <Terminal />
        </motion.div>
      </div>
    </motion.section>
  )
}
