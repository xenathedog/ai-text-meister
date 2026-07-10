import { useState } from 'react'
import { Check, X, Sparkles, Zap, Crown } from 'lucide-react'
import { affiliates } from '@/lib/affiliate-config'

const plans = [
  { name: 'Kostenlos', price: '0€', period: 'Für immer', icon: Sparkles, popular: false, features: [
    { text: 'Text verbessern', included: true }, { text: 'Social Media Posts generieren', included: true }, { text: 'E-Mail Assistent', included: true }, { text: 'Bewerbungs-Helfer', included: true }, { text: '50 Generierungen / Monat', included: true }, { text: 'Werbung angezeigt', included: true }, { text: 'Premium-Tonalitäten', included: false }, { text: 'CSV/Text Export', included: false }, { text: 'Werbung entfernen', included: false },
  ]},
  { name: 'Premium', price: '4,99€', period: '/ Monat', icon: Crown, popular: true, features: [
    { text: 'Alles aus Kostenlos', included: true }, { text: 'Unbegrenzte Generierungen', included: true }, { text: 'Premium-Tonalitäten (20+)', included: true }, { text: 'CSV & Text Export', included: true }, { text: 'Werbung entfernen', included: true }, { text: 'Prioritäts-Support', included: true },
  ]},
  { name: 'Lifetime', price: '29,99€', period: 'Einmalzahlung', icon: Zap, popular: false, features: [
    { text: 'Alles aus Premium', included: true }, { text: 'Einmalzahlung, kein Abo', included: true }, { text: 'Für immer alle Updates', included: true },
  ]},
]

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4"><Crown className="w-4 h-4" /> Upgrade für volle Power</div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Wähle deinen Plan</h2>
        <p className="text-gray-600 max-w-xl mx-auto">Starte kostenlos oder schalte alle Features mit Premium frei.</p>
        <div className="flex items-center justify-center gap-3 mt-6">
          <span className={`text-sm font-medium ${billingPeriod === 'monthly' ? 'text-gray-900' : 'text-gray-400'}`}>Monatlich</span>
          <button onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')} className={`relative w-12 h-6 rounded-full transition-colors ${billingPeriod === 'yearly' ? 'bg-indigo-600' : 'bg-gray-300'}`}><div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${billingPeriod === 'yearly' ? 'translate-x-6' : 'translate-x-0.5'}`} /></button>
          <span className={`text-sm font-medium ${billingPeriod === 'yearly' ? 'text-gray-900' : 'text-gray-400'}`}>Jährlich <span className="text-green-600 text-xs font-bold">-20%</span></span>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <div key={plan.name} className={`relative rounded-2xl p-6 transition-all ${plan.popular ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200 scale-105' : 'bg-white border border-gray-200 hover:shadow-lg'}`}>
            {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">BELIEBTESTER PLAN</div>}
            <div className="mb-6"><plan.icon className={`w-8 h-8 mb-3 ${plan.popular ? 'text-indigo-200' : 'text-indigo-600'}`} /><h3 className={`text-xl font-bold mb-1 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3><div className="flex items-baseline gap-1"><span className={`text-3xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>{plan.price}</span><span className={`text-sm ${plan.popular ? 'text-indigo-200' : 'text-gray-500'}`}>{plan.period}</span></div></div>
            <ul className="space-y-2.5 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  {feature.included ? <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-indigo-200' : 'text-green-500'}`} /> : <X className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-indigo-300' : 'text-gray-300'}`} />}
                  <span className={feature.included ? (plan.popular ? 'text-white' : 'text-gray-700') : (plan.popular ? 'text-indigo-200' : 'text-gray-400')}>{feature.text}</span>
                </li>
              ))}
            </ul>
            <button className={`w-full py-3 rounded-xl font-semibold transition-all ${plan.popular ? 'bg-white text-indigo-600 hover:bg-indigo-50' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>{plan.name === 'Kostenlos' ? 'Kostenlos starten' : plan.name === 'Lifetime' ? 'Jetzt kaufen' : 'Jetzt upgraden'}</button>
          </div>
        ))}
      </div>
      <div className="mt-16 grid md:grid-cols-3 gap-4">
        {affiliates.map((aff) => (
          <a key={aff.id} href={aff.url} target="_blank" rel="noopener noreferrer" className={`bg-gradient-to-br ${aff.gradient} rounded-2xl p-6 text-white transition-all hover:shadow-xl hover:-translate-y-1`}>
            <div className="text-3xl mb-3">{aff.icon}</div>
            <h4 className="font-bold text-lg mb-1">{aff.name}</h4>
            <p className="text-white/80 text-sm mb-3">{aff.description}</p>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors">{aff.cta} →</div>
          </a>
        ))}
      </div>
    </section>
  )
}