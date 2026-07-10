import { Sparkles, Heart } from 'lucide-react'
import AffiliateBanner from './AffiliateBanner'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-white font-bold text-lg mb-3">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              AI Text Meister
            </div>
            <p className="text-sm leading-relaxed max-w-md">KI-gestützte Textwerkzeuge für Deutsche – kostenlos, direkt im Browser, ohne Anmeldung.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Tools</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="hover:text-white cursor-pointer transition-colors">Text verbessern</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Social Media Posts</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">E-Mail Assistent</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Bewerbungs-Helfer</span></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Ressourcen</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="hover:text-white cursor-pointer transition-colors">Blog</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Tipps zum Schreiben</span></li>
            </ul>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <AffiliateBanner affiliateId="grammarly" variant="card" />
          <AffiliateBanner affiliateId="canva" variant="card" />
          <AffiliateBanner affiliateId="notion" variant="card" />
        </div>
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>© {new Date().getFullYear()} AI Text Meister. Alle Rechte vorbehalten.</p>
          <div className="flex items-center gap-1 text-gray-500">Mit <Heart className="w-3.5 h-3.5 text-red-500" /> gemacht in Deutschland</div>
        </div>
      </div>
    </footer>
  )
}