// import { Inter } from 'next/font/google'
// import './globals.css'

// const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Dashboard Écoles Cameroun',
//   description: 'Visualisation interactive des établissements éducatifs du Cameroun',
// }

// export default function RootLayout({ children }) {
//   return (
//     <html lang="fr">
//       <body className={inter.className}>
//         {children}
//       </body>
//     </html>
//   )
// }

















import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'EduCrisis - Dashboard des Écoles du Cameroun',
  description: 'Plateforme de monitoring et visualisation des établissements éducatifs au Cameroun',
  keywords: 'éducation, cameroun, écoles, dashboard, visualisation',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="h-full">
      <body className={`${inter.className} h-full bg-gray-50`}>
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  )
}