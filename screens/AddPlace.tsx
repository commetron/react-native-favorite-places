import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

import { StackNavParams } from '../App';
import PlaceForm from '../components/places/PlaceForm';
import { Place } from '../types/places';

type ScreenProps = NativeStackScreenProps<StackNavParams, 'AddPlace'>;

export default function AddPlace({ navigation }: ScreenProps) {
  const createPlaceHandler = (place: Place) => {
    navigation.navigate('AllPlaces', {
      place,
    });
  };

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}
