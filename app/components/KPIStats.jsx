
import { HDXService } from '../services/hdx'

export default function KPIStats({ schools }) {
  const stats = HDXService.getSchoolStats(schools)

  const statCards = [
    {
      label: 'Total Établissements',
      value: stats.total,
      icon: '🏛️',
      gradient: 'from-purple-500 to-pink-600',
      bg: 'bg-gradient-to-br from-purple-500/10 to-pink-600/10',
      description: 'Tous types confondus'
    },
    {
      label: 'Écoles PR/SEC',
      value: stats.school,
      icon: '📚',
      gradient: 'from-blue-500 to-cyan-600',
      bg: 'bg-gradient-to-br from-blue-500/10 to-cyan-600/10',
      description: 'Enseignement fondamental'
    },
    {
      label: 'Maternelles',
      value: stats.kindergarten,
      icon: '👶',
      gradient: 'from-green-500 to-emerald-600',
      bg: 'bg-gradient-to-br from-green-500/10 to-emerald-600/10',
      description: 'Éducation préscolaire'
    },
    {
      label: 'Collèges/Lycées',
      value: stats.college,
      icon: '🎓',
      gradient: 'from-orange-500 to-red-600',
      bg: 'bg-gradient-to-br from-orange-500/10 to-red-600/10',
      description: 'Enseignement secondaire'
    },
    {
      label: 'Universités',
      value: stats.university,
      icon: '🏫',
      gradient: 'from-indigo-500 to-purple-600',
      bg: 'bg-gradient-to-br from-indigo-500/10 to-purple-600/10',
      description: 'Enseignement supérieur'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      {statCards.map((card, index) => (
        <div key={index} className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-20 transition duration-1000 group-hover:duration-200 animate-glowe"></div>
          <div className={`relative ${card.bg} backdrop-blur-sm border border-white/20 rounded-3xl p-6 shadow-xl hover:shadow-3xl transition-all duration-500 hover:scale-105`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{card.label}</p>
                <p className="text-3xl font-black text-black mt-1">{card.value.toLocaleString('fr-FR')}</p>
              </div>
              <div className={`w-14 h-14 bg-gradient-to-br ${card.gradient} rounded-2xl flex items-center justify-center text-2xl text-white shadow-lg animate-float`}>
                {card.icon}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-black font-medium">{card.description}</span>
              <div className={`w-20 h-2 bg-gradient-to-r ${card.gradient} rounded-full opacity-60`}></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}