import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader({ onComplete }) {
  const [count, setCount] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const duration = 1600
    const start = performance.now()

    const tick = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * 100))

      if (progress < 1) {
        requestAnimationFrame(tick)
      } else {
        setCount(100)
        setTimeout(() => setVisible(false), 400)
      }
    }

    requestAnimationFrame(tick)
  }, [])

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-[#0B0F19] select-none"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex flex-col items-center">
            <p className="text-slate-500 text-xs tracking-[0.3em] uppercase mb-8">
              Loading
            </p>

            <div className="flex items-end leading-none mb-8">
              <span className="text-[5rem] sm:text-[7rem] font-thin text-white tabular-nums leading-none">
                {String(count).padStart(2, '0')}
              </span>
              <span className="text-[5rem] sm:text-[7rem] font-thin text-white/30 leading-none">
                %
              </span>
            </div>

            <div className="w-48 sm:w-64 h-px bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500"
                style={{ width: `${count}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
