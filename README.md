

 📊 EduCrisis Dashboard

A modern **Next.js dashboard** that visualizes ~2,350 schools in Cameroon and tracks **primary enrollment trends** using **OpenStreetMap (HOTOSM/HDX)** and **World Bank data**.  
Built with **React, TailwindCSS, Leaflet, and Chart.js** — clean, responsive, and portfolio‑ready.



🚀 Features

- **Key Indicators (KPIs)**: total schools, breakdown by type (kindergartens, primary/secondary, colleges, universities).
- **Interactive Map**: Leaflet map with ~2,350 geolocated schools, popups showing name, type, and city.
- **Dynamic Chart**: World Bank API integration to display net primary enrollment trends over time.
- **Modern UI/UX**: TailwindCSS styling, gradient headers, responsive cards, and professional dashboard layout.
- **Modular Architecture**: reusable components, service layer for data, clean and scalable structure.


📂 Project Structure


app/
 ├─ page.js                → Main dashboard page
 ├─ services/
 │    └─ hdx.js            → Service to load schools.geojson
components/
 ├─ Header.jsx             → Header with navigation
 ├─ Footer.jsx             → Footer with credits
 ├─ KPIStats.jsx           → Key indicators
 ├─ SchoolsMap.jsx         → Interactive Leaflet map
 └─ EnrollmentChart.jsx    → World Bank chart
public/
 └─ data/
      └─ schools.geojson   → GeoJSON dataset (~2,350 schools)




 🌍 Data Sources

- **Schools**: `schools.geojson` (~2,350 schools) from [HOTOSM/HDX](https://data.humdata.org/).  
- **Enrollment Indicator**: World Bank API  
  - Country: Cameroon (`CMR`)  
  - Indicator: `SE.PRM.NENR` (Net primary school enrollment rate)


 🛠️ Tech Stack

- [Next.js](https://nextjs.org/) – React framework
- [React](https://react.dev/) – UI components
- [TailwindCSS](https://tailwindcss.com/) – Styling
- [Leaflet](https://leafletjs.com/) – Interactive maps
- [Chart.js](https://www.chartjs.org/) + [react-chartjs-2](https://react-chartjs-2.js.org/) – Data visualization


 🎯 Purpose

EduCrisis Dashboard was designed to:  
- Support **NGOs and humanitarian actors** in monitoring educational infrastructures.  
- Showcase **technical expertise** in Next.js, React, Tailwind, and data visualization.  
- Provide a **portfolio-ready project** demonstrating real-world impact and professional design.




