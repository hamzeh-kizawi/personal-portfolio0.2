import { Github, Mail, Heart, Code2 } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-100 dark:bg-[#080e1a] border-t border-slate-200 dark:border-[#334155] py-8 px-4">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-slate-500 text-sm">
          <Code2 size={16} className="text-indigo-500 dark:text-indigo-400" />
          <span>
            &copy; {currentYear}{' '}
            <span className="text-slate-700 dark:text-slate-400 font-medium">Hamzeh Kizawi</span>
            {' '}— Built with{' '}
            <Heart size={12} className="inline text-red-500 fill-red-500" />{' '}
            using React &amp; Tailwind
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="mailto:hamza.ky919@gmail.com"
            className="text-slate-400 dark:text-slate-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-200"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
          <a
            href="https://github.com/hamzeh-kizawi?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 dark:text-slate-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-200"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}
