


export default function Footer() {
  return (
    <footer className="bg-white/60 backdrop-blur-lg border-t border-white/20 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-sm">🎓</span>
            </div>
            <p className="text-sm text-gray-700 font-medium">
              Données fournies par <span className="text-blue-600 font-semibold">HOTOSM/HDX</span>
            </p>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
              Next.js 15 • React 18 • Tailwind CSS 4
            </span>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200/50 text-center">
          <p className="text-xs text-gray-500">
            © 2024 EduCrisis Analytics - Plateforme de visualisation éducative moderne
          </p>
        </div>
      </div>
    </footer>
  )
}