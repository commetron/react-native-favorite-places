import { useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';

import { StackNavParams } from '../App';
import PlacesList from '../components/places/PlacesList';
import { Place } from '../types/places';

type ScreenProps = NativeStackScreenProps<StackNavParams, 'AllPlaces'>;

export default function AllPlaces({ route }: ScreenProps) {
  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused || !route.params) {
      return;
    }

    setLoadedPlaces((preState) => [route.params.place, ...preState]);
  }, [isFocused, route]);

  return <PlacesList places={loadedPlaces} />;
}
