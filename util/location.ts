const API_KEY = 'secret';

export function getMapPreview(lon: number, lat: number): string {
  return `https://maps.geoapify.com/v1/staticmap?style=osm-bright-smooth&width=600&height=400&center=lonlat%3A${lon}%2C${lat}&zoom=14.3497&marker=lonlat%3A${lon}%2C${lat}%3Btype%3Aawesome%3Bcolor%3A%23bb3f73%3Bsize%3Ax-large%3Bicon%3Apaw%7Clonlat%3A${lon}%2C${lat}%3Btype%3Amaterial%3Bcolor%3A%234c905a%3Bicon%3Atree%3Bicontype%3Aawesome%7Clonlat%3A${lon}%2C${lat}%3Btype%3Amaterial%3Bcolor%3A%234c905a%3Bicon%3Atree%3Bicontype%3Aawesome&apiKey=${API_KEY}`;
}
