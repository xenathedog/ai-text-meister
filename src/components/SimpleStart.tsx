import { useState } from 'react'
import { Check, ExternalLink, ChevronRight } from 'lucide-react'

export default function SimpleStart() {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const [openStep, setOpenStep] = useState(0)
  const toggleComplete = (step: number) => { setCompletedSteps(prev => { const next = new Set(prev); if (next.has(step)) next.delete(step); else next.add(step); return next }) }
  const steps = [
    { title: 'GitHub-Konto erstellen', emoji: '🐙', time: '2 Min', why: 'GitHub speichert deinen Code in der Cloud.', instructions: [
      { action: 'Öffne', url: 'https://github.com/signup', label: 'github.com/signup' },
      { action: 'Klicke Sign up', text: 'Oben rechts' },
      { action: 'Gib E-Mail ein', text: 'Deine E-Mail-Adresse' },
      { action: 'Wähle Passwort', text: 'Mind. 8 Zeichen' },
      { action: 'Bestätige per E-Mail', text: 'Gib den Code ein' },
    ], finished: '✅ GitHub-Konto erstellt!' },
    { title: 'Code hochladen', emoji: '📤', time: '5 Min', why: 'Damit Vercel deinen Code finden kann.', instructions: [
      { action: 'Öffne', url: 'https://github.com/new', label: 'github.com/new' },
      { action: 'Name: ai-text-meister', text: 'Repository-Name' },
      { action: 'Create repository klicken', text: 'Grüner Button' },
      { action: 'Upload existing file', text: 'Dateien hochladen' },
      { action: 'Commit changes', text: 'Fertig!' },
    ], finished: '✅ Code bei GitHub!' },
    { title: 'Vercel-Konto', emoji: '▲', time: '1 Min', why: 'Vercel macht deine Seite sichtbar.', instructions: [
      { action: 'Öffne', url: 'https://vercel.com/signup', label: 'vercel.com/signup' },
      { action: 'Continue with GitHub', text: 'Am einfachsten' },
    ], finished: '✅ Vercel-Konto!' },
    { title: 'Online stellen 🎉', emoji: '🚀', time: '1 Min', why: 'Jetzt wird deine Seite live!', instructions: [
      { action: 'Öffne', url: 'https://vercel.com/new', label: 'vercel.com/new' },
      { action: 'Import Git Repository', text: 'Repo auswählen' },
      { action: 'Deploy klicken', text: 'Warte 30 Sek...' },
    ], finished: '🎉 Website ist LIVE!' },
  ]
  const progress = Math.round((completedSteps.size / steps.length) * 100)
  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">🚀 Online stellen – in 10 Minuten</h1>
        <p className="text-gray-500 mb-6">Keine Vorkenntnisse nötig.</p>
        <div className="max-w-xs mx-auto">
          <div className="flex justify-between text-sm text-gray-500 mb-1"><span>Fortschritt</span><span>{completedSteps.size}/{steps.length}</span></div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} /></div>
        </div>
      </div>
      <div className="space-y-4">
        {steps.map((step, i) => {
          const isOpen = openStep === i; const isDone = completedSteps.has(i)
          return (
            <div key={i} className={`rounded-2xl border-2 transition-all ${isDone ? 'border-green-300 bg-green-50' : isOpen ? 'border-indigo-300 bg-indigo-50/50 shadow-lg' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
              <button onClick={() => setOpenStep(isOpen ? -1 : i)} className="w-full text-left p-5 flex items-center gap-4">
                <span className="text-3xl">{step.emoji}</span>
                <div className="flex-1"><h3 className={`font-bold text-lg ${isDone ? 'text-green-700 line-through' : 'text-gray-900'}`}>{step.title}</h3><span className="text-sm text-gray-400">⏱ {step.time}</span></div>
                <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 space-y-4">
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-sm text-blue-700">💡 {step.why}</div>
                  <div className="space-y-2">
                    {step.instructions.map((instr, j) => (
                      <div key={j} className="flex items-start gap-3 bg-white rounded-xl p-3 border border-gray-100">
                        <span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{j + 1}</span>
                        <div><span className="font-semibold text-gray-800">{instr.action}</span>
                          {'url' in instr && instr.url ? <a href={instr.url} target="_blank" rel="noopener noreferrer" className="ml-1 text-indigo-600 hover:text-indigo-800 underline inline-flex items-center gap-1">{instr.label} <ExternalLink className="w-3 h-3" /></a> : <span className="ml-1 text-gray-600">– {instr.text}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-sm text-green-700 font-medium">{step.finished}</div>
                  <button onClick={() => toggleComplete(i)} className={`w-full py-3 rounded-xl font-semibold transition-all ${isDone ? 'bg-green-100 text-green-700 border border-green-300 hover:bg-green-200' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'}`}>{isDone ? '✓ Geschafft!' : 'Als erledigt markieren ✓'}</button>
                </div>
              )}
            </div>
          )
        })}
      </div>
      <div className="mt-10 text-center bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-2">{completedSteps.size === steps.length ? '🎉 Du hast es geschafft!' : `${steps.length - completedSteps.size} Schritte noch!`}</h3>
        <p className="text-indigo-100">{completedSteps.size === steps.length ? 'Deine Website ist live! 💰' : 'Du schaffst das! 💪'}</p>
      </div>
    </section>
  )
}