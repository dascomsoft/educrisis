'use client'

import { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'
import { HDXService } from '../services/hdx'

export default function RegionalDistribution({ schools }) {
  const chartRef = useRef(null)

  useEffect(() => {
    Chart.register(...registerables)
    
    const regionalData = HDXService.getRegionalDistribution(schools)
    
    // Préparer les données pour le graphique
    const labels = regionalData.map(item => item.city)
    const data = regionalData.map(item => item.count)
    const backgroundColors = [
      'rgba(59, 130, 246, 0.8)',
      'rgba(16, 185, 129, 0.8)',
      'rgba(245, 158, 11, 0.8)',
      'rgba(139, 92, 246, 0.8)',
      'rgba(239, 68, 68, 0.8)',
      'rgba(99, 102, 241, 0.8)',
      'rgba(20, 184, 166, 0.8)',
      'rgba(249, 115, 22, 0.8)',
      'rgba(139, 92, 246, 0.8)',
      'rgba(236, 72, 153, 0.8)'
    ]

    const chartData = {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors.map(color => color.replace('0.8', '1')),
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      }]
    }

    const ctx = document.getElementById('regionalChart')
    if (ctx) {
      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'y',
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              titleColor: '#1f2937',
              bodyColor: '#374151',
              borderColor: '#e5e7eb',
              borderWidth: 1,
              cornerRadius: 8,
              displayColors: true,
              callbacks: {
                label: function(context) {
                  return `${context.parsed.x} établissements`
                }
              }
            }
          },
          scales: {
            x: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              },
              ticks: {
                font: {
                  family: 'Inter',
                  size: 11
                }
              }
            },
            y: {
              grid: {
                display: false
              },
              ticks: {
                font: {
                  family: 'Inter',
                  size: 11
                }
              }
            }
          },
          animation: {
            duration: 1000,
            easing: 'easeOutQuart'
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

  const regionalData = HDXService.getRegionalDistribution(schools)

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6 hover:shadow-3xl transition-all duration-500">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Distribution Régionale
          </h2>
          <p className="text-sm text-gray-600 mt-1">Top 10 des villes par nombre d'établissements</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
          {regionalData.length} villes
        </div>
      </div>
      
      <div className="h-64 mb-6">
        <canvas id="regionalChart"></canvas>
      </div>

      {/* Liste détaillée */}
      <div className="space-y-3">
        {regionalData.slice(0, 5).map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl shadow-sm border border-gray-100/50 hover:shadow-md transition-all duration-300 group">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg ${
                index === 0 ? 'bg-gradient-to-br from-yellow-500 to-orange-500' :
                index === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-600' :
                index === 2 ? 'bg-gradient-to-br from-amber-600 to-orange-600' :
                'bg-gradient-to-br from-blue-500 to-purple-600'
              }`}>
                {index + 1}
              </div>
              <div>
                <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {item.city === 'Inconnue' ? 'Localité non spécifiée' : item.city}
                </p>
                <p className="text-xs text-gray-500">
                  {item.count} établissement{item.count > 1 ? 's' : ''}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-gray-700">
                {((item.count / schools.length) * 100).toFixed(1)}%
              </span>
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${(item.count / Math.max(...regionalData.map(r => r.count))) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {regionalData.length > 5 && (
        <div className="mt-4 pt-4 border-t border-gray-200/50">
          <p className="text-xs text-gray-500 text-center">
            Et {regionalData.length - 5} autre{regionalData.length - 5 > 1 ? 's' : ''} ville{regionalData.length - 5 > 1 ? 's' : ''}...
          </p>
        </div>
      )}
    </div>
  )
}