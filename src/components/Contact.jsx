import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Github, Send, MessageCircle } from 'lucide-react'
import toast from 'react-hot-toast'

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

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hamza.ky919@gmail.com',
    href: 'mailto:hamza.ky919@gmail.com',
    color: 'text-indigo-500 dark:text-indigo-400',
    bg: 'bg-indigo-500/10',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+40 0735776480',
    href: 'tel:+400735776480',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+40 0735776480',
    href: 'https://wa.me/400735776480',
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-500/10',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/hamzeh-kizawi',
    href: 'https://github.com/hamzeh-kizawi?tab=repositories',
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-500/10',
  },
]

const inputClass =
  'w-full bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-[#334155] text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors duration-200'

export default function Contact() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast.success("Message sent! I'll get back to you soon.")
        setFormData({ name: '', email: '', message: '' })
      } else {
        toast.error('Something went wrong. Please try again.')
      }
    } catch {
      toast.error('Network error. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#0a1120]" {...sectionEntrance}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-indigo-500 dark:text-indigo-400 font-medium mb-2 tracking-wider uppercase text-sm">Let's Connect</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">Get in Touch</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mb-4" />
          <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="md:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-200 dark:border-[#334155] p-6 sm:p-8 space-y-5"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Hamzeh Kizawi"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or just say hello..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25 active:scale-[0.98]"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={17} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="md:col-span-2 flex flex-col gap-4"
          >
            <div className="bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-200 dark:border-[#334155] p-6 flex-grow">
              <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-6">Contact Info</h3>
              <div className="space-y-4">
                {contactInfo.map(({ icon: Icon, label, value, href, color, bg }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-4 group"
                  >
                    <div className={`${bg} p-3 rounded-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                      <Icon size={18} className={color} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-slate-400 dark:text-slate-500 text-xs mb-0.5">{label}</p>
                      <p className="text-slate-700 dark:text-slate-300 text-sm font-medium group-hover:text-slate-900 dark:group-hover:text-white transition-colors truncate">
                        {value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-600/10 to-purple-600/10 dark:from-indigo-600/20 dark:to-purple-600/20 rounded-2xl border border-indigo-500/20 dark:border-indigo-500/30 p-6">
              <p className="text-slate-900 dark:text-white font-semibold mb-2">Open to Opportunities</p>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                I'm actively looking for new opportunities. Whether it's a full-time role, freelance project, or collaboration — let's talk!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
