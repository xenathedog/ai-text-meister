import { affiliates } from '@/lib/affiliate-config'

interface AffiliateBannerProps {
  affiliateId: string
  variant?: 'inline' | 'card' | 'wide'
}

export default function AffiliateBanner({ affiliateId, variant = 'wide' }: AffiliateBannerProps) {
  const aff = affiliates.find(a => a.id === affiliateId)
  if (!aff) return null

  if (variant === 'card') {
    return (
      <a href={aff.url} target="_blank" rel="noopener noreferrer nofollow" className={`block bg-gradient-to-br ${aff.gradient} rounded-2xl p-6 text-white transition-all hover:shadow-xl hover:-translate-y-1`}>
        <div className="text-3xl mb-2">{aff.icon}</div>
        <h4 className="font-bold text-lg mb-1">{aff.name}</h4>
        <p className="text-white/80 text-sm mb-1">{aff.tagline}</p>
        <p className="text-white/60 text-xs mb-3">{aff.description}</p>
        <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors">{aff.cta} →</span>
      </a>
    )
  }

  return (
    <div className={`bg-gradient-to-r ${aff.gradient} rounded-2xl p-6 text-white text-center`}>
      <span className="text-2xl mb-2 block">{aff.icon}</span>
      <h3 className="text-lg font-bold mb-1">{aff.name} – {aff.tagline}</h3>
      <p className="text-white/80 text-sm mb-3">{aff.description}</p>
      <a href={aff.url} target="_blank" rel="noopener noreferrer nofollow" className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-white/30 transition-colors text-sm">{aff.cta} →</a>
    </div>
  )
}