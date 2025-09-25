

'use client'

import { useEffect, useRef } from 'react'

export default function SchoolsMap({ schools }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)

  useEffect(() => {
    const initMap = async () => {
      const L = await import('leaflet')
      await import('leaflet/dist/leaflet.css')

      // Fix pour les icônes Leaflet
      delete L.Icon.Default.prototype._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      })

      if (mapRef.current && !mapInstanceRef.current) {
        const map = L.map(mapRef.current).setView([5.6919, 12.7449], 6)
        
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map)

        // Ajout des marqueurs avec styles modernes
        schools.forEach(school => {
          if (school.lat && school.lng) {
            const color = getColorByType(school.type)
            const icon = L.divIcon({
              html: `
                <div class="relative">
                  <div class="w-4 h-4 bg-${color}-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                  <div class="absolute inset-0 w-4 h-4 bg-${color}-200 rounded-full animate-ping"></div>
                </div>
              `,
              className: 'custom-marker',
              iconSize: [16, 16],
              iconAnchor: [8, 8]
            })

            L.marker([school.lat, school.lng], { icon })
              .addTo(map)
              .bindPopup(`
                <div class="p-3 min-w-[200px] bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-white/20">
                  <h3 class="font-bold text-gray-900 text-sm">${school.name}</h3>
                  <div class="flex items-center space-x-2 mt-2">
                    <span class="w-3 h-3 bg-${color}-500 rounded-full"></span>
                    <span class="text-xs text-gray-600 capitalize">${school.type}</span>
                  </div>
                  <p class="text-xs text-gray-500 mt-1 flex items-center">
                    <span class="text-lg mr-1">📍</span> ${school.city}
                  </p>
                </div>
              `)
          }
        })

        mapInstanceRef.current = map
      }
    }

    initMap()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [schools])

  const getColorByType = (type) => {
    const colors = {
      school: 'blue',
      kindergarten: 'green',
      college: 'orange',
      university: 'purple'
    }
    return colors[type] || 'gray'
  }

  return (
    <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6 hover:shadow-3xl transition-all duration-500">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Carte Interactive
          </h2>
          <p className="text-sm text-gray-600 mt-1">Répartition géographique des établissements</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
          {schools.length} établissements
        </div>
      </div>
      
      <div className="h-96 rounded-2xl overflow-hidden relative">
        <div ref={mapRef} className="w-full h-full" />
        
        {/* Légende */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-4">
          <div className="space-y-2 text-xs font-medium">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-gray-700">Écoles</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-700">Maternelles</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
              <span className="text-gray-700">Collèges</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}