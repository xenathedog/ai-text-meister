const ADSENSE_CLIENT_ID = ''
const ADS_ENABLED = false
const AD_UNITS = { banner: '', inArticle: '', inFeed: '', responsive: '' }

export function initAdSense() {
  if (!ADS_ENABLED || !ADSENSE_CLIENT_ID) return
  const script = document.createElement('script')
  script.async = true
  script.crossOrigin = 'anonymous'
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`
  document.head.appendChild(script)
}

export function AdBanner({ unit, format = 'auto', className = '' }: { unit?: string; format?: string; className?: string }) {
  if (!ADS_ENABLED || !ADSENSE_CLIENT_ID) {
    return <div className={`bg-gray-50 border border-dashed border-gray-200 rounded-xl p-6 text-center text-gray-400 text-xs ${className}`}>Anzeige</div>
  }
  return (
    <div className={`overflow-hidden ${className}`}>
      <ins className="adsbygoogle" style={{ display: 'block' }} data-ad-client={ADSENSE_CLIENT_ID} data-ad-slot={unit || AD_UNITS.responsive} data-ad-format={format} data-full-width-responsive="true" />
    </div>
  )
}

export function AdBanner728x90({ className = '' }: { className?: string }) {
  return <div className={`text-center ${className}`}><AdBanner unit={AD_UNITS.banner} format="horizontal" /></div>
}

export function AdBanner300x250({ className = '' }: { className?: string }) {
  return <AdBanner unit={AD_UNITS.inArticle} format="rectangle" className={className} />
}

export function AdInFeed({ className = '' }: { className?: string }) {
  return <AdBanner unit={AD_UNITS.inFeed} format="fluid" className={className} />
}