import { useState } from 'react'
import { Copy, Check, ExternalLink, Globe, CreditCard, TrendingUp } from 'lucide-react'

const steps = [
  { id: 'github', title: '1. GitHub-Repo', description: 'Code hochladen', color: 'bg-gray-800', content: 'Gehe zu github.com/new → Repo erstellen → Dateien hochladen → Commit.' },
  { id: 'vercel', title: '2. Vercel Deploy', description: 'Online stellen', color: 'bg-blue-600', content: 'Gehe zu vercel.com/new → Import Git Repository → Deploy.', link: 'https://vercel.com/new' },
  { id: 'adsense', title: '3. Google AdSense', description: 'Werbung aktivieren', color: 'bg-amber-500', content: 'Konto erstellen → Website angeben → Warten → Ad Unit erstellen → ID in AdSense.tsx einfügen.' },
  { id: 'stripe', title: '4. Stripe', description: 'Premium verkaufen', color: 'bg-purple-600', content: 'Stripe-Konto → Product erstellen → Payment Link → Link in Pricing einfügen.' },
  { id: 'seo', title: '5. SEO & Marketing', description: 'Besucher ansziehen', color: 'bg-red-500', content: 'Google Search Console → Social Media → Reddit/Foren → Blog-Posts.' },
]

export default function DeploymentGuide() {
  const [expanded, setExpanded] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const handleCopy = (t: string) => { navigator.clipboard.writeText(t); setCopied(t); setTimeout(() => setCopied(null), 2000) }
  return (
    <section className="max-w-4xl mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4"><Globe className="w-4 h-4" /> Schritt-für-Schritt</div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">So kommst du online 💰</h2>
      </div>
      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step.id} className="relative">
            <button onClick={() => setExpanded(expanded === step.id ? null : step.id)} className="w-full text-left bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-all flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl ${step.color} flex items-center justify-center flex-shrink-0 shadow-lg z-10 text-white font-bold`}>{step.id === 'github' ? '🐙' : step.id === 'vercel' ? '▲' : step.id === 'adsense' ? '📊' : step.id === 'stripe' ? '💳' : '📈'}</div>
              <div className="flex-1"><h3 className="font-bold text-gray-900 text-lg">{step.title}</h3><p className="text-gray-500 text-sm">{step.description}</p></div>
              <span className="text-gray-400 text-sm mt-1">{expanded === step.id ? '▲' : '▼'}</span>
            </button>
            {expanded === step.id && (
              <div className="mt-2 ml-16 bg-gray-50 rounded-xl p-5 border border-gray-100">
                <div className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">{step.content}</div>
                {step.link && <a href={step.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"><ExternalLink className="w-4 h-4" /> Jetzt starten</a>}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-white">
        <h3 className="text-xl font-bold mb-4">💰 Geschätztes Einkommen</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/10 rounded-xl p-4 text-center"><div className="text-3xl font-bold mb-1">50-150€</div><div className="text-green-100 text-sm">pro Monat</div><div className="text-green-200 text-xs mt-1">bei 1.000 Besuchern/Tag</div></div>
          <div className="bg-white/10 rounded-xl p-4 text-center"><div className="text-3xl font-bold mb-1">250-750€</div><div className="text-green-100 text-sm">pro Monat</div><div className="text-green-200 text-xs mt-1">bei 5.000 Besuchern/Tag</div></div>
          <div className="bg-white/10 rounded-xl p-4 text-center"><div className="text-3xl font-bold mb-1">500-1500€</div><div className="text-green-100 text-sm">pro Monat</div><div className="text-green-200 text-xs mt-1">bei 10.000 Besuchern/Tag</div></div>
        </div>
      </div>
    </section>
  )
}