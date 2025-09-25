// // app/page.js
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import KPIStats from "./components/KPIStats";
// import SchoolsMap from "./components/SchoolsMap";
// import EnrollmentChart from "./components/EnrollmentChart";

// /**
//  * Page principale (App Router - server component).
//  * Les composants (KPIStats, SchoolsMap, EnrollmentChart) sont des client components
//  * qui chargent les données localement/depuis l'API World Bank.
//  */
// export default function Page() {
//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-900">
//       <Header />

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <h1 className="text-3xl font-semibold mb-4">Dashboard Écoles — Cameroun</h1>

//         {/* Grid principale : KPI en haut, carte + chart en bas */}
//         <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
//           {/* KPI occupy full width on mobile, 1/3 on large */}
//           <div className="lg:col-span-1">
//             <KPIStats />
//           </div>

//           {/* Carte et chart partagent 2/3 */}
//           <div className="lg:col-span-2 grid gap-6 grid-cols-1">
//             <div className="bg-white rounded-2xl shadow-sm p-4">
//               <h2 className="text-lg font-medium mb-2">Carte des écoles</h2>
//               <div className="h-96">
//                 <SchoolsMap />
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl shadow-sm p-4">
//               <h2 className="text-lg font-medium mb-2">Taux net de scolarisation primaire (World Bank)</h2>
//               <EnrollmentChart />
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }





















// 'use client'

// import { useState, useEffect } from 'react'
// import Header from './components/Header'
// import Footer from './components/Footer'
// import KPIStats from './components/KPIStats'
// import SchoolsMap from './components/SchoolsMap'
// // import EnrollmentChart from './components/EnrollmentChart'
// import SchoolTypeChart from './components/SchoolTypeChart'
// import RegionalDistribution from './components/RegionalDistribution'

// export default function Dashboard() {
//   const [schools, setSchools] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [activeTab, setActiveTab] = useState('overview')

//   // Charger les données GeoJSON
//   useEffect(() => {
//     const loadSchoolsData = async () => {
//       try {
//         setLoading(true)
//         const response = await fetch('/data/schools.geojson')
//         if (!response.ok) {
//           throw new Error('Erreur lors du chargement des données')
//         }
        
//         const geojson = await response.json()
        
//         // Transformer les features en format utilisable
//         const transformedSchools = geojson.features.map((feature, index) => ({
//           id: feature.id || `school-${index}`,
//           name: feature.properties?.name?.trim() || "École non nommée",
//           type: feature.properties?.amenity?.toLowerCase() || "school",
//           city: feature.properties?.["addr:city"]?.trim() || "Ville inconnue",
//           region: feature.properties?.["addr:region"] || "Région inconnue",
//           lat: feature.geometry?.coordinates[1] || 0,
//           lng: feature.geometry?.coordinates[0] || 0
//         }))
        
//         setSchools(transformedSchools)
//         setLoading(false)
//       } catch (err) {
//         setError(err.message)
//         setLoading(false)
//       }
//     }

//     loadSchoolsData()
//   }, [])

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-gray-100">
//         <div className="text-center animate-fade-in">
//           <div className="relative">
//             <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
//               <svg className="w-10 h-10 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//               </svg>
//             </div>
//             <div className="absolute inset-0 bg-primary-200 rounded-2xl blur-xl opacity-30 animate-pulse-slow"></div>
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">Chargement des données</h2>
//           <p className="text-gray-600">Initialisation du dashboard éducatif...</p>
//           <div className="mt-6 w-64 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
//             <div className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full animate-pulse"></div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-gray-100">
//         <div className="text-center max-w-md mx-auto p-8">
//           <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
//             <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.994-.833-2.764 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
//             </svg>
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">Erreur de chargement</h2>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button 
//             onClick={() => window.location.reload()}
//             className="btn-primary"
//           >
//             Réessayer
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
//       <Header />
      
//       <main className="flex-1 container mx-auto px-4 py-8">
//         {/* En-tête du dashboard */}
//         <div className="text-center mb-8 animate-slide-up">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl shadow-lg mb-4">
//             <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//             </svg>
//           </div>
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">
//             Dashboard <span className="text-gradient">Éducation Cameroun</span>
//           </h1>
//           <p className="text-gray-600 max-w-3xl mx-auto text-lg">
//             Monitoring de {schools.length.toLocaleString()} établissements éducatifs à travers le Cameroun
//           </p>
//         </div>

//         {/* Navigation par onglets */}
//         <div className="flex space-x-1 bg-white rounded-2xl p-1 shadow-soft mb-8 max-w-md mx-auto">
//           {['overview', 'analytics', 'maps'].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
//                 activeTab === tab
//                   ? 'bg-primary-500 text-white shadow-md'
//                   : 'text-gray-600 hover:text-gray-900'
//               }`}
//             >
//               {tab === 'overview' && 'Vue générale'}
//               {tab === 'analytics' && 'Analytique'}
//               {tab === 'maps' && 'Cartographie'}
//             </button>
//           ))}
//         </div>

//         {/* Section KPI */}
//         <div className="mb-8 animate-fade-in">
//           <KPIStats schools={schools} />
//         </div>

//         {/* Contenu des onglets */}
//         {activeTab === 'overview' && (
//           <div className="space-y-8">
//             {/* Cartes principales */}
//             <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
//               <div className="dashboard-card p-6">
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
//                   <svg className="w-6 h-6 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
//                   </svg>
//                   Répartition par Type d'Établissement
//                 </h2>
//                 <SchoolTypeChart schools={schools} />
//               </div>

//               <div className="dashboard-card p-6">
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
//                   <svg className="w-6 h-6 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//                   </svg>
//                   Taux de Scolarisation Primaire
//                 </h2>
//                 {/* <EnrollmentChart /> */}
//               </div>
//             </div>

//             {/* Carte */}
//             <div className="dashboard-card p-6">
//               <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
//                 <svg className="w-6 h-6 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
//                 </svg>
//                 Carte des Établissements
//               </h2>
//               <div className="h-96 rounded-xl overflow-hidden">
//                 <SchoolsMap schools={schools} />
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === 'analytics' && (
//           <div className="space-y-8">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//               <div className="dashboard-card p-6">
//                 <h3 className="text-xl font-semibold text-gray-800 mb-4">Répartition Régionale</h3>
//                 <RegionalDistribution schools={schools} />
//               </div>
//               <div className="dashboard-card p-6">
//                 <h3 className="text-xl font-semibold text-gray-800 mb-4">Évolution Temporelle</h3>
//                 <div className="h-64 flex items-center justify-center text-gray-500">
//                   <p>Graphique d'évolution en développement...</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === 'maps' && (
//           <div className="space-y-8">
//             <div className="dashboard-card p-6">
//               <h3 className="text-xl font-semibold text-gray-800 mb-4">Cartographie Avancée</h3>
//               <div className="h-96 rounded-xl overflow-hidden">
//                 <SchoolsMap schools={schools} advanced={true} />
//               </div>
//             </div>
//           </div>
//         )}
//       </main>

//       <Footer />
//     </div>
//   )
// }

























'use client'

import { useEffect, useState } from 'react'
import { HDXService } from './services/hdx'
import Header from './components/Header'
import Footer from './components/Footer'
import KPIStats from './components/KPIStats'
import SchoolsMap from './components/SchoolsMap'
import EnrollmentChart from './components/EnrollmentChart'
import SchoolTypeChart from './components/SchoolTypeChart'
import RegionalDistribution from './components/RegionalDistribution'

export default function Dashboard() {
  const [schools, setSchools] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadSchoolsData()
  }, [])

  const loadSchoolsData = async () => {
    try {
      const schoolsData = await HDXService.loadSchoolsData()
      setSchools(schoolsData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl animate-float">
            <span className="text-3xl">🎓</span>
          </div>
          <h2 className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Chargement des données
          </h2>
          <p className="text-gray-600">Analyse des établissements éducatifs...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h3 className="text-xl font-black text-gray-900 mb-2">Erreur de chargement</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={loadSchoolsData}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Réessayer
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* En-tête hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-white/20 mb-6">
            <span className="text-2xl">🇨🇲</span>
            <span className="text-lg font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              République du Cameroun
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4">
            Analytics Éducatifs
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Plateforme de visualisation avancée des {schools.length.toLocaleString('fr-FR')} établissements éducatifs recensés
          </p>
        </div>

        {/* KPI Stats */}
        <KPIStats schools={schools} />

        {/* Grid principale */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <SchoolsMap schools={schools} />
          <EnrollmentChart />
        </div>

        {/* Grid secondaire */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SchoolTypeChart schools={schools} />
          <RegionalDistribution schools={schools} />
        </div>

        {/* Section informations */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '📊', title: 'Data Science', desc: 'Analytics avancés avec traitement en temps réel' },
            { icon: '🌍', title: 'Couverture Nationale', desc: 'Données couvrant l\'ensemble du territoire' },
            { icon: '⚡', title: 'Performance', desc: 'Interface ultra-rapide et responsive' }
          ].map((item, index) => (
            <div key={index} className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-500">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-black text-gray-900 text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}