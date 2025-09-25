


export class HDXService {
  static async loadSchoolsData() {
    try {
      const response = await fetch('/data/schools.geojson');
      if (!response.ok) throw new Error('Erreur chargement GeoJSON');
      
      const geojson = await response.json();
      return this.transformGeoJSON(geojson);
    } catch (error) {
      console.error('HDXService Error:', error);
      throw error;
    }
  }

  static transformGeoJSON(geojson) {
    return geojson.features.map(feature => ({
      name: feature.properties?.name || 'École non nommée',
      type: feature.properties?.amenity || 'school',
      city: feature.properties?.['addr:city'] || 'Ville inconnue',
      lat: feature.geometry?.coordinates[1] || 0,
      lng: feature.geometry?.coordinates[0] || 0
    }));
  }

  static getSchoolStats(schools) {
    const stats = { total: schools.length, school: 0, kindergarten: 0, college: 0, university: 0, other: 0 };
    
    schools.forEach(school => {
      const type = school.type?.toLowerCase();
      stats[type in stats ? type : 'other']++;
    });

    return stats;
  }

  static getRegionalDistribution(schools) {
    const cities = {};
    schools.forEach(school => {
      const city = school.city;
      cities[city] = (cities[city] || 0) + 1;
    });
    
    return Object.entries(cities)
      .map(([city, count]) => ({ city, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }
}