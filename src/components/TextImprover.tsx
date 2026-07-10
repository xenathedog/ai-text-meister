import { useState, useMemo } from 'react'
import { Copy, Check, PenLine, RotateCcw, FileText, Clock, Hash, BookOpen, AlertTriangle } from 'lucide-react'

type Mode = 'analyze' | 'formal' | 'casual' | 'shorten' | 'expand'
const modeLabels: Record<Mode, string> = { analyze: 'Analysieren', formal: 'Formell machen', casual: 'Locker machen', shorten: 'Kürzen', expand: 'Erweitern' }

const germanFormalReplacements: [RegExp, string][] = [
  [/\bdu\b/gi, 'Sie'], [/\bdir\b/gi, 'Ihnen'], [/\bdein\b/gi, 'Ihr'], [/\bdeine\b/gi, 'Ihre'],
  [/\bHallo\b/gi, 'Sehr geehrte Damen und Herren,'], [/\bMfG\b/gi, 'Mit freundlichen Grüßen'],
  [/\bViele Grüße\b/gi, 'Mit freundlichen Grüßen'], [/\bBeste Grüße\b/gi, 'Mit freundlichen Grüßen'],
]
const germanCasualReplacements: [RegExp, string][] = [
  [/\bSie\b/g, 'du'], [/\bIhnen\b/g, 'dir'], [/\bIhr\b/g, 'dein'], [/\bIhre\b/g, 'deine'],
  [/\bSehr geehrte Damen und Herren,?\s*/gi, 'Hallo! '], [/\bMit freundlichen Grüßen,?\s*/gi, 'Viele Grüße'],
]
const fillerWords = ['eigentlich', 'ziemlich', 'ganz', 'etwa', 'sozusagen', 'gewissermaßen', 'im Grunde genommen', 'im Wesentlichen', 'im Prinzip', 'man kann sagen']

function analyzeText(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean)
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
  const chars = text.length
  const readingTimeMin = Math.max(1, Math.ceil(words.length / 200))
  const foundFillers = fillerWords.filter(f => text.toLowerCase().includes(f))
  const avgWordsPerSentence = words.length / Math.max(sentences.length, 1)
  let readability = 'Gut'; let readabilityColor = 'text-green-600'
  if (avgWordsPerSentence > 20) { readability = 'Schwierig'; readabilityColor = 'text-red-600' }
  else if (avgWordsPerSentence > 15) { readability = 'Mittel'; readabilityColor = 'text-yellow-600' }
  const passiveVoiceMatches = text.match(/\b(wurde|wird|worden)\s+\w+(en|et|t)\b/gi) || []
  return { words: words.length, sentences: sentences.length, chars, readingTimeMin, foundFillers, avgWordsPerSentence: Math.round(avgWordsPerSentence * 10) / 10, readability, readabilityColor, passiveVoiceCount: passiveVoiceMatches.length }
}

function improveText(text: string, mode: Mode): string {
  let result = text
  if (mode === 'formal') { for (const [p, r] of germanFormalReplacements) result = result.replace(p, r); result = result.replace(/\bHi\b/g, 'Guten Tag').replace(/\bHey\b/g, 'Guten Tag') }
  if (mode === 'casual') { for (const [p, r] of germanCasualReplacements) result = result.replace(p, r) }
  if (mode === 'shorten') { for (const f of fillerWords) result = result.replace(new RegExp(`\\b${f}\\b`, 'gi'), ''); result = result.replace(/\s{2,}/g, ' ').replace(/,\s*,/g, ',') }
  if (mode === 'expand') { result = result.replace(/\bund\b/g, 'und auch').replace(/\baber\b/g, 'allerdings').replace(/\bweil\b/g, 'da') }
  return result.trim()
}

function Stat({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string | number }) {
  return (<div className="bg-gray-50 rounded-lg p-3"><div className="flex items-center gap-2 text-gray-500 text-xs mb-1"><Icon className="w-3.5 h-3.5" />{label}</div><div className="font-bold text-gray-900 text-lg">{value}</div></div>)
}

export default function TextImprover({ onBack }: { onBack: () => void }) {
  const [input, setInput] = useState(''); const [mode, setMode] = useState<Mode>('analyze'); const [copied, setCopied] = useState(false)
  const analysis = useMemo(() => input.trim() ? analyzeText(input) : null, [input])
  const output = useMemo(() => { if (!input.trim() || mode === 'analyze') return ''; return improveText(input, mode) }, [input, mode])
  const handleCopy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000) }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <button onClick={onBack} className="text-gray-500 hover:text-gray-700 text-sm font-medium mb-4 inline-flex items-center gap-1">← Zurück</button>
        <div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg"><PenLine className="w-5 h-5 text-white" /></div><h1 className="text-2xl font-bold text-gray-900">Text verbessern</h1></div>
        <p className="text-gray-500">Analysiere und verbessere deine Texte direkt im Browser.</p>
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {(Object.keys(modeLabels) as Mode[]).map((m) => (<button key={m} onClick={() => setMode(m)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${mode === m ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{modeLabels[m]}</button>))}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Dein Text</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Füge deinen Text hier ein..." className="w-full h-72 p-4 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm leading-relaxed" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2"><label className="text-sm font-medium text-gray-700">{mode === 'analyze' ? 'Analyse' : 'Ergebnis'}</label>{output && <button onClick={handleCopy} className="text-xs bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-3 py-1 rounded-lg flex items-center gap-1 font-medium">{copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}{copied ? 'Kopiert!' : 'Kopieren'}</button>}</div>
          {mode === 'analyze' && analysis ? (
            <div className="h-72 overflow-y-auto p-4 rounded-xl border border-gray-200 bg-white space-y-3">
              <div className="grid grid-cols-2 gap-3"><Stat icon={FileText} label="Wörter" value={analysis.words} /><Stat icon={Hash} label="Zeichen" value={analysis.chars} /><Stat icon={Clock} label="Lesezeit" value={`${analysis.readingTimeMin} Min`} /><Stat icon={BookOpen} label="Sätze" value={analysis.sentences} /></div>
              <div className="border-t border-gray-100 pt-3 space-y-2">
                <div className="flex items-center justify-between text-sm"><span className="text-gray-500">Lesbarkeit</span><span className={`font-medium ${analysis.readabilityColor}`}>{analysis.readability}</span></div>
                <div className="flex items-center justify-between text-sm"><span className="text-gray-500">Wörter/Satz</span><span className="font-medium">{analysis.avgWordsPerSentence}</span></div>
                <div className="flex items-center justify-between text-sm"><span className="text-gray-500">Passivformen</span><span className="font-medium">{analysis.passiveVoiceCount}</span></div>
              </div>
              {analysis.foundFillers.length > 0 && (<div className="border-t border-gray-100 pt-3"><div className="flex items-center gap-1 text-sm text-amber-600 font-medium mb-2"><AlertTriangle className="w-4 h-4" />Füllwörter ({analysis.foundFillers.length})</div><div className="flex flex-wrap gap-1">{analysis.foundFillers.map((f) => (<span key={f} className="bg-amber-50 text-amber-700 text-xs px-2 py-0.5 rounded-full border border-amber-200">{f}</span>))}</div></div>)}
            </div>
          ) : mode !== 'analyze' && output ? (
            <div className="h-72 overflow-y-auto p-4 rounded-xl border border-gray-200 bg-gray-50 text-sm leading-relaxed text-gray-800 whitespace-pre-wrap">{output}</div>
          ) : (
            <div className="h-72 flex items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 text-gray-400 text-sm">{input ? `Klicke auf "${modeLabels[mode]}" für das Ergebnis` : 'Gib einen Text ein, um zu beginnen'}</div>
          )}
        </div>
      </div>
    </div>
  )
}