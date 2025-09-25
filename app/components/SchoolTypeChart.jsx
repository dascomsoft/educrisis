
'use client'

import { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'
import { HDXService } from '../services/hdx'

export default function SchoolTypeChart({ schools }) {
  const chartRef = useRef(null)

  useEffect(() => {
    Chart.register(...registerables)
    
    const stats = HDXService.getSchoolStats(schools)
    const data = {
      labels: ['Écoles', 'Maternelles', 'Collèges', 'Universités', 'Autres'],
      datasets: [{
        data: [stats.school, stats.kindergarten, stats.college, stats.university, stats.other],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(107, 114, 128, 0.8)'
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
          'rgb(139, 92, 246)',
          'rgb(107, 114, 128)'
        ],
        borderWidth: 2
      }]
    }

    const ctx = document.getElementById('typeChart')
    if (ctx) {
      chartRef.current = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '65%',
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                font: { family: 'Inter', size: 11 },
                padding: 20
              }
            }
          }
        }
      })
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }
  }, [schools])

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6 hover:shadow-3xl transition-all duration-500">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Répartition par Type
          </h2>
          <p className="text-sm text-gray-600 mt-1">Distribution des établissements</p>
        </div>
      </div>
      
      <div className="h-64">
        <canvas id="typeChart"></canvas>
      </div>
    </div>
  )
}