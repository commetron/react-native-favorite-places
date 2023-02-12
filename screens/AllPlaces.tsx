import React from 'react';
import { View } from 'react-native';

import PlacesList from '../components/places/PlacesList';

interface Props {}

export default function AllPlaces({}: Props) {
  return <PlacesList places={[]} />;
}
