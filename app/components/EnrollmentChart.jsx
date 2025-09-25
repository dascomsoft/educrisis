



'use client'

import { useEffect, useState } from 'react'
import { Chart, registerables } from 'chart.js'

export default function EnrollmentChart() {
  const [chartData, setChartData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Chart.register(...registerables)
    fetchWorldBankData()
  }, [])

  const fetchWorldBankData = async () => {
    try {
      // Simulation de données en attendant l'API
      const mockData = {
        labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021'],
        datasets: [{
          label: 'Taux net de scolarisation primaire (%)',
          data: [78.5, 79.2, 80.1, 81.3, 82.0, 80.5, 81.8],
          borderColor: 'rgb(14, 165, 233)',
          backgroundColor: 'rgba(14, 165, 233, 0.1)',
          borderWidth: 4,
          fill: true,
          tension: 0.4,
        }]
      }
      
      setTimeout(() => {
        setChartData(mockData)
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Error fetching data:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (chartData) {
      const ctx = document.getElementById('enrollmentChart')
      if (ctx) {
        const chart = new Chart(ctx, {
          type: 'line',
          data: chartData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: {
                  font: { family: 'Inter', size: 12 },
                  color: '#374151'
                }
              }
            },
            scales: {
              y: {
                beginAtZero: false,
                grid: { color: 'rgba(0, 0, 0, 0.05)' },
                ticks: { 
                  callback: (value) => value + '%',
                  font: { family: 'Inter' }
                }
              },
              x: {
                grid: { display: false },
                ticks: { font: { family: 'Inter' } }
              }
            }
          }
        })

        return () => chart.destroy()
      }
    }
  }, [chartData])

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-100 rounded-2xl"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6 hover:shadow-3xl transition-all duration-500">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Scolarisation Primaire
          </h2>
          <p className="text-sm text-gray-600 mt-1">Évolution du taux net de scolarisation</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
          Banque Mondiale
        </div>
      </div>
      
      <div className="h-64">
        <canvas id="enrollmentChart"></canvas>
      </div>
    </div>
  )
}