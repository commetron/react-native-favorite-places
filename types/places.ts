export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface Place {
  id: string;
  title: string;
  imageUri: string;
  address: string;
  location: GeoPoint;
}
