import { Sparkles, Menu, X } from 'lucide-react'
import { useState } from 'react'

interface HeaderProps {
  activeTool: string
  setActiveTool: (tool: string) => void
}

const navItems = [
  { id: 'home', label: 'Startseite' },
  { id: 'text', label: 'Text verbessern' },
  { id: 'social', label: 'Social Media' },
  { id: 'email', label: 'E-Mail Assistent' },
  { id: 'bewerbung', label: 'Bewerbung' },
  { id: 'pricing', label: 'Premium', highlight: true },
  { id: 'start', label: '🚀 Online starten' },
]

export default function Header({ activeTool, setActiveTool }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <button onClick={() => setActiveTool('home')} className="flex items-center gap-2 font-bold text-xl text-indigo-600 hover:text-indigo-700 transition-colors">
          <Sparkles className="w-6 h-6" />
          AI Text Meister
        </button>
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => setActiveTool(item.id)} className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeTool === item.id ? 'bg-indigo-100 text-indigo-700' : 'highlight' in item && item.highlight ? 'text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-semibold' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
              {item.label}
            </button>
          ))}
        </nav>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {mobileOpen && (
        <nav className="md:hidden border-t border-gray-100 bg-white px-4 py-2 space-y-1">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => { setActiveTool(item.id); setMobileOpen(false) }} className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeTool === item.id ? 'bg-indigo-100 text-indigo-700' : 'highlight' in item && item.highlight ? 'text-indigo-600 hover:bg-indigo-50 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  )
}