import { useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';

import { StackNavParams } from '../App';
import PlacesList from '../components/places/PlacesList';
import { Place } from '../types/places';
import { fetchPlaces } from '../util/database';

type ScreenProps = NativeStackScreenProps<StackNavParams, 'AllPlaces'>;

export default function AllPlaces({ route }: ScreenProps) {
  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const loadPlaces = async () => {
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    };

    if (!isFocused) {
      return;
    }

    loadPlaces();
  }, [isFocused]);

  return <PlacesList places={loadedPlaces} />;
}
