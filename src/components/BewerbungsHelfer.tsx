import { useState } from 'react'
import { Copy, Check, Briefcase, RotateCcw, FileText, User, Building, Star } from 'lucide-react'
import AffiliateBanner from './AffiliateBanner'

type Tab = 'anschreiben' | 'lebenslauf' | 'tipps'

const tabLabels: Record<Tab, { label: string; icon: React.ElementType }> = {
  anschreiben: { label: 'Anschreiben', icon: FileText },
  lebenslauf: { label: 'Lebenslauf-Tipps', icon: User },
  tipps: { label: 'Bewerbungs-Tipps', icon: Star },
}

export default function BewerbungsHelfer({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<Tab>('anschreiben')
  const [copied, setCopied] = useState(false)
  const [formData, setFormData] = useState({ jobTitle: '', company: '', experience: '', skills: '', motivation: '', senderName: '' })
  const [generatedLetter, setGeneratedLetter] = useState('')

  const generateLetter = () => {
    const { jobTitle, company, experience, skills, motivation, senderName } = formData
    const name = senderName || '[Dein Name]'
    setGeneratedLetter(`${name}\n[Straße und Hausnummer]\n[PLZ Ort]\n[Telefonnummer]\n[E-Mail-Adresse]\n\n${company || '[Unternehmen]'}\n[Ansprechpartner/in]\n[Straße und Hausnummer]\n[PLZ Ort]\n\nOrt, den [Datum]\n\nBetreff: Bewerbung als ${jobTitle || '[Position]'}\n\nSehr geehrte Damen und Herren,\n\nmit großem Interesse habe ich Ihre Stellenanzeige für die Position als ${jobTitle || '[Position]'} bei ${company || '[Unternehmen]'} gelesen und bewerbe mich hiermit mit großem Enthusiasmus.\n\n${experience ? `Durch meine ${experience} konnte ich wertvolle Erfahrungen sammeln, die mich als idealen Kandidaten für diese Position qualifizieren.` : 'Meine bisherigen Erfahrungen und meine Leidenschaft für diesen Bereich machen mich zu einem starken Kandidaten für diese Position.'}\n\n${skills ? `Besonders hervorheben möchte ich meine Fähigkeiten in ${skills}, die ich in meiner bisherigen Tätigkeit erfolgreich eingesetzt habe.` : 'Zu meinen Stärken zählen insbesondere meine schnelle Auffassungsgabe, meine analytischen Fähigkeiten und meine Teamfähigkeit.'}\n\n${motivation || `Mich für ${company || '[Unternehmen]'} zu bewerben, ist vor allem die Möglichkeit, in einem innovativen Umfeld zu arbeiten und meine Fähigkeiten gezielt einzubringen.`}\n\nIch bin überzeugt, dass meine Qualifikationen und meine Motivation eine wertvolle Ergänzung für Ihr Team darstellen. Über die Einladung zu einem persönlichen Gespräch freue ich mich sehr.\n\nMit freundlichen Grüßen\n\n${name}`)
  }

  const handleCopy = () => { navigator.clipboard.writeText(generatedLetter); setCopied(true); setTimeout(() => setCopied(false), 2000) }

  const cvTips = [
    { title: '📋 Aufbau', items: ['Kontaktdaten oben, groß und klar', 'Berufserfahrung in umgekehrter Chronologie', 'Bildungsweg nach dem Berufsweg', 'Maximal 2 Seiten'] },
    { title: '✨ Formulierungen', items: ['Aktive Verben verwenden ("entwickelt", "geleitet", "optimiert")', 'Konkrete Erfolge nennen mit Zahlen', 'Fachbegriffe der Branche verwenden', 'Lücken erklären können'] },
    { title: '🎯 Keywords', items: ['Stellenanzeige auf Schlüsselbegriffe analysieren', 'Diese Keywords im Lebenslauf einbauen', 'ATGS-freundlich gestalten', 'Nicht übertreiben – Authentizität bleibt'] },
    { title: '🚫 Häufige Fehler', items: ['Rechtschreibfehler → immer Korrekturlesen!', 'Fotos: seriös, neutraler Hintergrund', 'Private Hobbys nur wenn relevant', 'Niemals lügen oder übertreiben'] },
  ]

  const applicationTips = [
    { title: '🎯 Vor der Bewerbung', tips: ['Unternehmen gründlich recherchieren', 'Ansprechpartner herausfinden', 'Stellenanzeige mehrfach lesen und verstehen', 'Eigene Stärken auf die Anforderungen abstimmen'] },
    { title: '📝 Das Anschreiben', tips: ['Erster Satz: Warum bewirbst du dich?', 'Mitte: Was bringst du mit? (mit Beispielen)', 'Schluss: Warum dieses Unternehmen?', 'Maximal eine Seite', 'Immer personalisiert, nie Copy-Paste'] },
    { title: '📊 Nach der Bewerbung', tips: ['1-2 Wochen abwarten, dann nachhaken', 'Telefonisch oder per E-Mail nachfragen', 'Absage als Lernchance sehen', 'Immer dankbar und professionell antworten'] },
    { title: '💼 Vorstellungsgespräch', tips: ['Klassische Fragen vorbereiten', 'Eigene Fragen stellen (zeigt Interesse)', 'Pünktlich sein (5 Min früher)', 'Bewerbungsunterlagen ausdrucken mitbringen'] },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <button onClick={onBack} className="text-gray-500 hover:text-gray-700 text-sm font-medium mb-4 inline-flex items-center gap-1">← Zurück zur Übersicht</button>
        <div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg"><Briefcase className="w-5 h-5 text-white" /></div><h1 className="text-2xl font-bold text-gray-900">Bewerbungs-Helfer</h1></div>
        <p className="text-gray-500">Erstelle überzeugende Anschreiben und erhalte Tipps für deine Bewerbung.</p>
      </div>
      <div className="flex gap-2 mb-6">{(Object.keys(tabLabels) as Tab[]).map((t) => { const cfg = tabLabels[t]; return (<button key={t} onClick={() => setTab(t)} className={`px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition-all ${tab === t ? 'bg-orange-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}><cfg.icon className="w-4 h-4" />{cfg.label}</button>) })}</div>
      {tab === 'anschreiben' && (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-2"><Building className="w-5 h-5 text-orange-500" />Deine Daten</h3>
            <div className="space-y-3">
              <div><label className="text-sm font-medium text-gray-700 mb-1 block">Dein Name</label><input type="text" value={formData.senderName} onChange={(e) => setFormData(p => ({ ...p, senderName: e.target.value }))} placeholder="Max Mustermann" className="w-full p-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500" /></div>
              <div><label className="text-sm font-medium text-gray-700 mb-1 block">Position / Job-Titel</label><input type="text" value={formData.jobTitle} onChange={(e) => setFormData(p => ({ ...p, jobTitle: e.target.value }))} placeholder="z.B. Software-Entwickler" className="w-full p-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500" /></div>
              <div><label className="text-sm font-medium text-gray-700 mb-1 block">Unternehmen</label><input type="text" value={formData.company} onChange={(e) => setFormData(p => ({ ...p, company: e.target.value }))} placeholder="z.B. Tech GmbH" className="w-full p-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500" /></div>
              <div><label className="text-sm font-medium text-gray-700 mb-1 block">Erfahrung</label><input type="text" value={formData.experience} onChange={(e) => setFormData(p => ({ ...p, experience: e.target.value }))} placeholder="z.B. 3 Jahre Erfahrung" className="w-full p-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500" /></div>
              <div><label className="text-sm font-medium text-gray-700 mb-1 block">Stärken / Skills</label><input type="text" value={formData.skills} onChange={(e) => setFormData(p => ({ ...p, skills: e.target.value }))} placeholder="z.B. React, Teamführung" className="w-full p-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500" /></div>
              <div><label className="text-sm font-medium text-gray-700 mb-1 block">Motivation (optional)</label><textarea value={formData.motivation} onChange={(e) => setFormData(p => ({ ...p, motivation: e.target.value }))} placeholder="Was motiviert dich?" rows={3} className="w-full p-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500" /></div>
            </div>
            <div className="flex gap-2">
              <button onClick={generateLetter} className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-orange-200 hover:shadow-xl flex items-center justify-center gap-2"><FileText className="w-5 h-5" />Anschreiben erstellen</button>
              {generatedLetter && (<button onClick={() => { setFormData({ jobTitle: '', company: '', experience: '', skills: '', motivation: '', senderName: '' }); setGeneratedLetter('') }} className="px-4 py-3 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"><RotateCcw className="w-5 h-5" /></button>)}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2"><label className="text-sm font-medium text-gray-700">Anschreiben-Vorschau</label>{generatedLetter && (<button onClick={handleCopy} className="text-xs bg-orange-100 text-orange-700 hover:bg-orange-200 px-3 py-1 rounded-lg flex items-center gap-1 transition-colors font-medium">{copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}{copied ? 'Kopiert!' : 'Kopieren'}</button>)}</div>
            {generatedLetter ? (<div className="bg-white rounded-2xl border border-gray-200 p-6 min-h-[500px] shadow-sm"><div className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap font-serif">{generatedLetter}</div></div>) : (<div className="h-[500px] flex items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 text-gray-400 text-sm"><div className="text-center"><FileText className="w-8 h-8 mx-auto mb-2 opacity-30" /><p>Fülle die Felder aus und erstelle dein Anschreiben</p></div></div>)}
          </div>
        </div>
      )}
      {tab === 'lebenslauf' && (<div className="grid md:grid-cols-2 gap-6">{cvTips.map((section) => (<div key={section.title} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"><h3 className="font-bold text-gray-900 mb-4 text-lg">{section.title}</h3><ul className="space-y-3">{section.items.map((item, i) => (<li key={i} className="flex items-start gap-3 text-sm text-gray-600"><span className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">{i + 1}</span>{item}</li>))}</ul></div>))}</div>)}
      {tab === 'tipps' && (<div className="space-y-6">{applicationTips.map((section) => (<div key={section.title} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"><h3 className="font-bold text-gray-900 mb-4 text-lg">{section.title}</h3><ul className="space-y-2">{section.tips.map((tip, i) => (<li key={i} className="flex items-start gap-3 text-sm text-gray-600"><span className="text-orange-500 mt-0.5">✓</span>{tip}</li>))}</ul></div>))}</div>)}
      <div className="mt-8"><AffiliateBanner affiliateId="canva" variant="wide" /></div>
    </div>
  )
}