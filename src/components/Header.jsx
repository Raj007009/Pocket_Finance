import { useApp } from '../context/AppContext'

export default function Header() {
  const { role, setRole, darkMode, setDarkMode } = useApp()

  return (
    <header className="flex items-center justify-between py-5 mb-2">
      <div>
        <h1 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 tracking-tight">
          PocketFinance
        </h1>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">June 2024</p>
      </div>

      <div className="flex items-center gap-3">
        {/* Role switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400 dark:text-zinc-500 hidden sm:block">Role</span>
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            className="text-xs border border-zinc-200 dark:border-zinc-700 rounded-lg px-2.5 py-1.5 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 cursor-pointer focus:outline-none focus:ring-1 focus:ring-zinc-300 dark:focus:ring-zinc-600"
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Role badge */}
        <span className={`text-xs px-2 py-1 rounded-lg font-medium hidden sm:block
          ${role === 'admin'
            ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400'
            : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-700/50 dark:text-zinc-400'
          }`}>
          {role === 'admin' ? 'Admin mode' : 'Read only'}
        </span>

        {/* Dark mode toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-400 dark:text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-700/50 text-sm"
          title="Toggle dark mode"
        >
          {darkMode ? '○' : '●'}
        </button>
      </div>
    </header>
  )
}
