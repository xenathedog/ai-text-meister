import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import TextImprover from './components/TextImprover'
import SocialMediaGenerator from './components/SocialMediaGenerator'
import EmailAssistant from './components/EmailAssistant'
import BewerbungsHelfer from './components/BewerbungsHelfer'
import Pricing from './components/Pricing'
import SimpleStart from './components/SimpleStart'
import Footer from './components/Footer'

type View = 'home' | 'text' | 'social' | 'email' | 'bewerbung' | 'pricing' | 'start'

export default function App() {
  const [activeView, setActiveView] = useState<View>('home')

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header activeTool={activeView} setActiveTool={setActiveView as (v: string) => void} />
      <main>
        {activeView === 'home' && <Hero setActiveTool={setActiveView as (v: string) => void} />}
        {activeView === 'text' && <TextImprover onBack={() => setActiveView('home')} />}
        {activeView === 'social' && <SocialMediaGenerator onBack={() => setActiveView('home')} />}
        {activeView === 'email' && <EmailAssistant onBack={() => setActiveView('home')} />}
        {activeView === 'bewerbung' && <BewerbungsHelfer onBack={() => setActiveView('home')} />}
        {activeView === 'pricing' && <Pricing />}
        {activeView === 'start' && <SimpleStart />}
      </main>
      <Footer />
    </div>
  )
}
