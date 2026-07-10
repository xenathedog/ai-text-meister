import { useState } from 'react'
import { Copy, Check, Mail, ArrowRight, RotateCcw } from 'lucide-react'

type EmailType = 'business' | 'followup' | 'thankyou' | 'complaint' | 'inquiry' | 'resignation' | 'invitation' | 'custom'
type Formality = 'formal' | 'semi' | 'casual'

const emailTypeLabels: Record<EmailType, string> = {
  business: 'Geschäfts-E-Mail', followup: 'Nachfassen', thankyou: 'Dankeschön', complaint: 'Reklamation', inquiry: 'Anfrage', resignation: 'Kündigung', invitation: 'Einladung', custom: 'Frei formulieren',
}

const formalities: Record<Formality, string> = { formal: 'Formell', semi: 'Semi-formell', casual: 'Locker' }

const emailTemplates: Record<EmailType, Record<Formality, (data: Record<string, string>) => string>> = {
  business: {
    formal: (d) => `Sehr geehrte Damen und Herren,\n\n${d.context || 'Ich wende mich an Sie bezüglich [Thema].'}\n\n${d.mainText || 'Im Rahmen unserer Geschäftsbeziehung möchte ich Ihnen folgenden Vorschlag unterbreiten:'}\n\n${d.additionalInfo || 'Für Rückfragen stehe ich Ihnen gerne zur Verfügung.'}\n\nMit freundlichen Grüßen,\n${d.senderName || '[Ihr Name]'}`,
    semi: (d) => `Guten Tag,\n\n${d.context || 'ich melde mich bezüglich [Thema].'}\n\n${d.mainText || 'Ich möchte Ihnen kurz einen Vorschlag unterbreiten:'}\n\n${d.additionalInfo || 'Bei Fragen stehe ich Ihnen gerne zur Verfügung.'}\n\nViele Grüße,\n${d.senderName || '[Ihr Name]'}`,
    casual: (d) => `Hallo!\n\n${d.context || 'Ich schreibe dir wegen [Thema].'}\n\n${d.mainText || 'Ich hab eine Idee, die wir besprechen könnten:'}\n\n${d.additionalInfo || 'Lass mich wissen, was du denkst!'}`,
  },
  followup: {
    formal: (d) => `Sehr geehrte Damen und Herren,\n\nich erlaube mir, auf meine letzte Nachricht vom [Datum] zurückzukommen.\n\n${d.mainText || 'Ich möchte sicherstellen, dass meine Anfrage bei Ihnen angekommen ist.'}\n\nMit freundlichen Grüßen,\n${d.senderName || '[Ihr Name]'}`,
    semi: (d) => `Guten Tag,\n\nich wollte mich nochmal wegen meiner letzten Nachricht melden.\n\n${d.mainText || 'Hast du die Chance gehabt, dir das anzuschauen?'}\n\nViele Grüße,\n${d.senderName || '[Ihr Name]'}`,
    casual: (d) => `Hey!\n\n${d.mainText || 'Kurze Erinnerung wegen meiner letzten Nachricht.'}\n\nBeste,\n${d.senderName || '[Ihr Name]'}`,
  },
  thankyou: {
    formal: (d) => `Sehr geehrte Damen und Herren,\n\n${d.context || 'ich möchte mich herzlich für [Anlass] bedanken.'}\n\nMit freundlichen Grüßen,\n${d.senderName || '[Ihr Name]'}`,
    semi: (d) => `Guten Tag,\n\n${d.context || 'Vielen Dank für [Anlass].'}\n\nViele Grüße,\n${d.senderName || '[Ihr Name]'}`,
    casual: (d) => `Hey!\n\nSUPER vielen Dank für deine Hilfe! Das war echt klasse 👍\n\nLG,\n${d.senderName || '[Ihr Name]'}`,
  },
  complaint: {
    formal: (d) => `Sehr geehrte Damen und Herren,\n\n${d.context || 'hiermit möchte ich einen formellen Beschwerde zu [Thema] einreichen.'}\n\nMit freundlichen Grüßen,\n${d.senderName || '[Ihr Name]'}`,
    semi: (d) => `Guten Tag,\n\n${d.context || 'leider muss ich mich wegen [Thema] an Sie wenden.'}\n\nViele Grüße,\n${d.senderName || '[Ihr Name]'}`,
    casual: (d) => `Hallo,\n\n${d.mainText || 'Ich hab ein Problem mit [Thema] und würde das gerne klären.'}\n\nBeste Grüße,\n${d.senderName || '[Ihr Name]'}`,
  },
  inquiry: {
    formal: (d) => `Sehr geehrte Damen und Herren,\n\n${d.context || 'hiermit möchte ich eine Anfrage zu [Thema/Produkt] stellen.'}\n\nMit freundlichen Grüßen,\n${d.senderName || '[Ihr Name]'}`,
    semi: (d) => `Guten Tag,\n\n${d.context || 'ich habe eine Frage zu [Thema].'}\n\nViele Grüße,\n${d.senderName || '[Ihr Name]'}`,
    casual: (d) => `Hey!\n\n${d.mainText || 'Ich hab eine kurze Frage zu [Thema]. Kannst du mir weiterhelfen?'}`,
  },
  resignation: {
    formal: (d) => `Sehr geehrte Damen und Herren,\n\nhiermit kündige ich meinen Arbeitsvertrag fristgerecht zum [Datum].\n\n${d.mainText || 'Die Entscheidung ist mir nicht leicht gefallen.'}\n\nMit freundlichen Grüßen,\n${d.senderName || '[Ihr Name]'}`,
    semi: (d) => `Guten Tag,\n\n${d.mainText || 'Nach langer Überlegung habe ich mich dazu entschieden, meinen Job aufzugeben.'}\n\nViele Grüße,\n${d.senderName || '[Ihr Name]'}`,
    casual: (d) => `Hey,\n\n${d.mainText || 'Ich muss dir leider mitteilen, dass ich gekündigt habe.'}\n\nLG,\n${d.senderName || '[Ihr Name]'}`,
  },
  invitation: {
    formal: (d) => `Sehr geehrte Damen und Herren,\n\n${d.context || 'hiermit möchten wir Sie herzlich zu [Veranstaltung] einladen.'}\n\nMit freundlichen Grüßen,\n${d.senderName || '[Ihr Name]'}`,
    semi: (d) => `Hallo zusammen,\n\n${d.mainText || 'Wir laden Sie herzlich zu [Veranstaltung] ein!'}\n\nViele Grüße,\n${d.senderName || '[Ihr Name]'}`,
    casual: (d) => `Hey! 🎉\n\n${d.mainText || 'Du bist herzlich eingeladen zu [Veranstaltung]!'}`,
  },
  custom: {
    formal: (d) => `Sehr geehrte Damen und Herren,\n\n${d.mainText || '[Ihre Nachricht hier]'}\n\nMit freundlichen Grüßen,\n${d.senderName || '[Ihr Name]'}`,
    semi: (d) => `Guten Tag,\n\n${d.mainText || '[Ihre Nachricht hier]'}\n\nViele Grüße,\n${d.senderName || '[Ihr Name]'}`,
    casual: (d) => `Hallo!\n\n${d.mainText || '[Deine Nachricht hier]'}\n\nBeste Grüße,\n${d.senderName || '[Dein Name]'}`,
  },
}

export default function EmailAssistant({ onBack }: { onBack: () => void }) {
  const [emailType, setEmailType] = useState<EmailType>('business')
  const [formality, setFormality] = useState<Formality>('formal')
  const [context, setContext] = useState('')
  const [mainText, setMainText] = useState('')
  const [additionalInfo, setAdditionalInfo] = useState('')
  const [senderName, setSenderName] = useState('')
  const [generated, setGenerated] = useState('')
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    const template = emailTemplates[emailType][formality]
    setGenerated(template({ context, mainText, additionalInfo, senderName }))
  }
  const handleCopy = () => { navigator.clipboard.writeText(generated); setCopied(true); setTimeout(() => setCopied(false), 2000) }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <button onClick={onBack} className="text-gray-500 hover:text-gray-700 text-sm font-medium mb-4 inline-flex items-center gap-1">← Zurück zur Übersicht</button>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg"><Mail className="w-5 h-5 text-white" /></div>
          <h1 className="text-2xl font-bold text-gray-900">E-Mail Assistent</h1>
        </div>
        <p className="text-gray-500">Schreibe professionelle E-Mails in Sekunden.</p>
      </div>
      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div><label className="text-sm font-medium text-gray-700 mb-3 block">E-Mail Art</label><div className="grid grid-cols-2 gap-2">{(Object.keys(emailTypeLabels) as EmailType[]).map((type) => (<button key={type} onClick={() => setEmailType(type)} className={`p-2.5 rounded-xl text-xs font-medium transition-all ${emailType === type ? 'bg-emerald-600 text-white shadow-md' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}>{emailTypeLabels[type]}</button>))}</div></div>
          <div><label className="text-sm font-medium text-gray-700 mb-3 block">Tonfall</label><div className="flex gap-2">{(Object.keys(formalities) as Formality[]).map((f) => (<button key={f} onClick={() => setFormality(f)} className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${formality === f ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{formalities[f]}</button>))}</div></div>
          <div><label className="text-sm font-medium text-gray-700 mb-2 block">Kontext / Betreff</label><input type="text" value={context} onChange={(e) => setContext(e.target.value)} placeholder="z.B. Meeting-Anfrage" className="w-full p-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" /></div>
          <div><label className="text-sm font-medium text-gray-700 mb-2 block">Hauptinhalt</label><textarea value={mainText} onChange={(e) => setMainText(e.target.value)} placeholder="Was möchtest du mitteilen?" rows={4} className="w-full p-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500" /></div>
          <div><label className="text-sm font-medium text-gray-700 mb-2 block">Zusätzliche Infos (optional)</label><input type="text" value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} placeholder="z.B. Zeitfenster, Deadline" className="w-full p-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" /></div>
          <div><label className="text-sm font-medium text-gray-700 mb-2 block">Dein Name</label><input type="text" value={senderName} onChange={(e) => setSenderName(e.target.value)} placeholder="Max Mustermann" className="w-full p-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" /></div>
          <div className="flex gap-2">
            <button onClick={handleGenerate} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-emerald-200 hover:shadow-xl flex items-center justify-center gap-2"><Mail className="w-5 h-5" />E-Mail generieren</button>
            {generated && (<button onClick={() => { setGenerated(''); setContext(''); setMainText(''); setAdditionalInfo('') }} className="px-4 py-3 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"><RotateCcw className="w-5 h-5" /></button>)}
          </div>
        </div>
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-2"><label className="text-sm font-medium text-gray-700">E-Mail Vorschau</label>{generated && (<button onClick={handleCopy} className="text-xs bg-emerald-100 text-emerald-700 hover:bg-emerald-200 px-3 py-1 rounded-lg flex items-center gap-1 transition-colors font-medium">{copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}{copied ? 'Kopiert!' : 'Kopieren'}</button>)}</div>
          {generated ? (
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="bg-gray-50 border-b border-gray-200 p-4"><div className="space-y-2 text-sm"><div className="flex gap-2"><span className="text-gray-400 w-16">An:</span><span className="text-gray-700">[Empfänger]</span></div><div className="flex gap-2"><span className="text-gray-400 w-16">Betreff:</span><span className="text-gray-700 font-medium">{context || '[Betreff]'}</span></div></div></div>
              <div className="p-6 text-sm text-gray-800 leading-relaxed whitespace-pre-wrap font-serif">{generated}</div>
            </div>
          ) : (
            <div className="h-[500px] flex items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 text-gray-400 text-sm"><div className="text-center"><Mail className="w-8 h-8 mx-auto mb-2 opacity-30" /><p>Fülle die Felder aus und klicke auf "Generieren"</p></div></div>
          )}
        </div>
      </div>
    </div>
  )
}