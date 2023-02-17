const API_KEY = 'secret';

export function getMapPreview(lat: number, lng: number): string {
  return `https://maps.geoapify.com/v1/staticmap?style=osm-bright-smooth&width=600&height=400&center=lonlat%3A${lng}%2C${lat}&zoom=14.3497&marker=lonlat%3A${lng}%2C${lat}%3Btype%3Aawesome%3Bcolor%3A%23bb3f73%3Bsize%3Ax-large%3Bicon%3Apaw%7Clonlat%3A${lng}%2C${lat}%3Btype%3Amaterial%3Bcolor%3A%234c905a%3Bicon%3Atree%3Bicontype%3Aawesome%7Clonlat%3A${lng}%2C${lat}%3Btype%3Amaterial%3Bcolor%3A%234c905a%3Bicon%3Atree%3Bicontype%3Aawesome&apiKey=${API_KEY}`;
}

export async function getAddress(
  lat: number,
  lng: number
): Promise<string | undefined> {
  const response = await fetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch address!');
  }

  const data = await response.json();
  if (data.features.length) {
    return data.features[0].properties.formatted;
  }
  return undefined;
}
