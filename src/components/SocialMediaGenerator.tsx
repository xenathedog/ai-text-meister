import { useState } from 'react'
import { Copy, Check, Sparkles, Instagram, Linkedin, Twitter, ArrowRight } from 'lucide-react'
import AffiliateBanner from './AffiliateBanner'

type Platform = 'instagram' | 'linkedin' | 'twitter' | 'tiktok'

const platformConfig: Record<Platform, { label: string; icon: React.ElementType; maxLength: number; color: string; bgColor: string }> = {
  instagram: { label: 'Instagram', icon: Instagram, maxLength: 2200, color: 'from-pink-500 to-purple-600', bgColor: 'bg-pink-50' },
  linkedin: { label: 'LinkedIn', icon: Linkedin, maxLength: 3000, color: 'from-blue-600 to-blue-800', bgColor: 'bg-blue-50' },
  twitter: { label: 'Twitter / X', icon: Twitter, maxLength: 280, color: 'from-gray-800 to-black', bgColor: 'bg-gray-50' },
  tiktok: { label: 'TikTok', icon: Sparkles, maxLength: 2200, color: 'from-red-500 to-pink-600', bgColor: 'bg-red-50' },
}

const topics = ['Business & Marketing', 'Technologie', 'Fitnes & Gesundheit', 'Reisen', 'Finanzen', 'Persönliche Entwicklung', 'Essen & Kochen', 'Mode & Lifestyle', 'Bildung', 'Nachrichten & Aktuelles']
const tones = ['Professionell', 'Inspirierend', 'Humorvoll', 'Informativ', 'Motivierend', 'Freundlich', 'Neugierig machend']

const hashtagSets: Record<string, string[]> = {
  'Business & Marketing': ['#marketing', '#business', '#entrepreneur', '#growth', '#startup', '#digitalmarketing', '#success'],
  'Technologie': ['#tech', '#innovation', '#ai', '#coding', '#digital', '#future', '#software'],
  'Fitnes & Gesundheit': ['#fitness', '#health', '#workout', '#motivation', '#wellness', '#fit', '#healthylifestyle'],
  'Reisen': ['#travel', '#wanderlust', '#adventure', '#explore', '#travelgram', '#nature', '#vacation'],
  'Finanzen': ['#finance', '#money', '#investing', '#wealth', '#financialfreedom', '#crypto', '#saving'],
  'Persönliche Entwicklung': ['#mindset', '#growth', '#motivation', '#selfimprovement', '#goals', '#success', '#mindfulness'],
  'Essen & Kochen': ['#food', '#cooking', '#recipe', '#foodie', '#homemade', '#yummy', '#chef'],
  'Mode & Lifestyle': ['#fashion', '#style', '#ootd', '#lifestyle', '#beauty', '#trend', '#aesthetic'],
  'Bildung': ['#learning', '#education', '#knowledge', '#study', '#student', '#onlinelearning', '#courses'],
  'Nachrichten & Aktuelles': ['#news', '#trending', '#aktuell', '#weltgeschehen', '#medien', '#journalismus'],
}

function generateHashtags(topic: string): string {
  const tags = hashtagSets[topic] || hashtagSets['Business & Marketing']
  return tags.slice(0, 5).join(' ')
}

function generatePost(platform: Platform, topic: string, tone: string, keywords: string): string {
  let post = `\u{1F4CC} ${topic} \u2013 ${tone}\n\nHier ist dein ${platform}-Post zum Thema \"${topic}\" im Ton \"${tone}\".\n\nFüge hier deine Details ein und nutze folgende Stichwörter: ${keywords || 'keine angegeben'}.\n\n${generateHashtags(topic)}`
  return post
}

interface SocialMediaGeneratorProps {
  onBack: () => void
}

export default function SocialMediaGenerator({ onBack }: SocialMediaGeneratorProps) {
  const [platform, setPlatform] = useState<Platform>('instagram')
  const [topic, setTopic] = useState('Business & Marketing')
  const [tone, setTone] = useState('Professionell')
  const [keywords, setKeywords] = useState('')
  const [generated, setGenerated] = useState('')
  const [copied, setCopied] = useState(false)
  const config = platformConfig[platform]

  const handleGenerate = () => { setGenerated(generatePost(platform, topic, tone, keywords)) }
  const handleCopy = () => { navigator.clipboard.writeText(generated); setCopied(true); setTimeout(() => setCopied(false), 2000) }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <button onClick={onBack} className="text-gray-500 hover:text-gray-700 text-sm font-medium mb-4 inline-flex items-center gap-1">← Zurück zur Übersicht</button>
        <div className="flex items-center gap-3 mb-2">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center shadow-lg`}><Sparkles className="w-5 h-5 text-white" /></div>
          <h1 className="text-2xl font-bold text-gray-900">Social Media Post Generator</h1>
        </div>
        <p className="text-gray-500">Generiere ansprechende Posts für alle Plattformen in Sekunden.</p>
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">Plattform</label>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(platformConfig) as Platform[]).map((p) => {
                const cfg = platformConfig[p]
                return (<button key={p} onClick={() => setPlatform(p)} className={`p-3 rounded-xl text-sm font-medium flex items-center gap-2 transition-all ${platform === p ? `${cfg.bgColor} ring-2 ring-offset-1 ring-indigo-500` : 'bg-gray-50 hover:bg-gray-100'}`}><cfg.icon className="w-4 h-4" />{cfg.label}</button>)
              })}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">Thema / Branche</label>
            <select value={topic} onChange={(e) => setTopic(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              {topics.map((t) => (<option key={t} value={t}>{t}</option>))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">Tonfall</label>
            <div className="flex flex-wrap gap-2">
              {tones.map((t) => (<button key={t} onClick={() => setTone(t)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${tone === t ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{t}</button>))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Stichwörter (optional)</label>
            <input type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="z.B. KI, Automatisierung, Zukunft" className="w-full p-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <button onClick={handleGenerate} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-indigo-200 hover:shadow-xl flex items-center justify-center gap-2"><Sparkles className="w-5 h-5" />Post generieren</button>
        </div>
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">Vorschau</label>
            {generated && (<button onClick={handleCopy} className="text-xs bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-3 py-1 rounded-lg flex items-center gap-1 transition-colors font-medium">{copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}{copied ? 'Kopiert!' : 'Kopieren'}</button>)}
          </div>
          {generated ? (
            <div className={`${config.bgColor} rounded-2xl p-6 min-h-[400px]`}>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100"><div className={`w-10 h-10 rounded-full bg-gradient-to-br ${config.color}`} /><div><div className="font-semibold text-sm text-gray-900">Dein Unternehmen</div><div className="text-xs text-gray-400">Soeben · {config.label}</div></div></div>
                <div className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">{generated}</div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-6 text-xs text-gray-400"><span>❤️ Gefällt mir</span><span>💬 Kommentieren</span><span>↗️ Teilen</span></div>
              </div>
              <div className="mt-3 text-right"><span className={`text-xs ${generated.length > config.maxLength ? 'text-red-500 font-medium' : 'text-gray-400'}`}>{generated.length} / {config.maxLength} Zeichen</span></div>
            </div>
          ) : (
            <div className="h-[400px] flex items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 text-gray-400 text-sm"><div className="text-center"><Sparkles className="w-8 h-8 mx-auto mb-2 opacity-30" /><p>Wähle eine Plattform und klicke auf "Generieren"</p></div></div>
          )}
        </div>
      </div>
      <div className="mt-8"><AffiliateBanner affiliateId="canva" variant="wide" /></div>
    </div>
  )
}