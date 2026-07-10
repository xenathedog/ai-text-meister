import { Sparkles, PenLine, Mail, Briefcase, ArrowRight, Star, Users, Zap } from 'lucide-react'
import AffiliateBanner from './AffiliateBanner'

interface HeroProps {
  setActiveTool: (tool: string) => void
}

const tools = [
  { id: 'text', icon: PenLine, title: 'Text verbessern', description: 'Mach deine Texte professioneller.', color: 'from-blue-500 to-indigo-600', bgColor: 'bg-blue-50', iconColor: 'text-blue-600' },
  { id: 'social', icon: Sparkles, title: 'Social Media Posts', description: 'Generiere ansprechende Posts.', color: 'from-purple-500 to-pink-600', bgColor: 'bg-purple-50', iconColor: 'text-purple-600' },
  { id: 'email', icon: Mail, title: 'E-Mail Assistent', description: 'Schreibe professionelle E-Mails.', color: 'from-emerald-500 to-teal-600', bgColor: 'bg-emerald-50', iconColor: 'text-emerald-600' },
  { id: 'bewerbung', icon: Briefcase, title: 'Bewerbungs-Helfer', description: 'Erstelle überzeugende Anschreiben.', color: 'from-orange-500 to-red-600', bgColor: 'bg-orange-50', iconColor: 'text-orange-600' },
]
const stats = [
  { icon: Users, value: '25.000+', label: 'Nutzer' },
  { icon: Star, value: '4.9/5', label: 'Bewertung' },
  { icon: Zap, value: '<2s', label: 'Ergebnis' },
]

export default function Hero({ setActiveTool }: HeroProps) {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" /> Kostenlos · Sofort nutzbar · Kein Account nötig
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Schreib besser.{' '}<span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Schneller.</span>{' '}Wirkungsvoller.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">KI-gestützte Textwerkzeuge für Deutsche – kostenlos, direkt im Browser, ohne Anmeldung.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button onClick={() => setActiveTool('start')} className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-green-200 hover:shadow-xl active:scale-[0.98] text-lg">
                🚀 Jetzt online stellen (kostenlos) <ArrowRight className="w-5 h-5" />
              </button>
              <button onClick={() => setActiveTool('text')} className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-200 hover:shadow-xl active:scale-[0.98]">
                Tools gratis testen
              </button>
            </div>
            <div className="flex justify-center gap-8 md:gap-12">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="flex items-center justify-center gap-1 text-indigo-600 mb-1">
                    <stat.icon className="w-4 h-4" /><span className="font-bold text-lg">{stat.value}</span>
                  </div>
                  <span className="text-sm text-gray-500">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Wähle dein Tool</h2>
          <p className="text-gray-600 max-w-xl mx-auto">Vier mächtige Tools, die dir helfen, besser zu schreiben – alle kostenlos und direkt im Browser.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <button key={tool.id} onClick={() => setActiveTool(tool.id)} className={`group ${tool.bgColor} p-8 rounded-2xl text-left transition-all hover:shadow-xl hover:-translate-y-1` }>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 shadow-lg`}><tool.icon className="w-6 h-6 text-white" /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-700 transition-colors">{tool.title}</h3>
              <p className="text-gray-600 mb-4">{tool.description}</p>
              <span className={`inline-flex items-center gap-1 text-sm font-medium ${tool.iconColor}`}>Jetzt nutzen <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </button>
          ))}
        </div>
      </section>
      <div className="max-w-6xl mx-auto px-4 pb-8"><AffiliateBanner affiliateId="grammarly" variant="wide" /></div>
    </div>
  )
}