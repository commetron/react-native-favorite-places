import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

import { StackNavParams } from '../App';
import PlaceForm from '../components/places/PlaceForm';
import { Place } from '../types/places';
import { insertPlace } from '../util/database';

type ScreenProps = NativeStackScreenProps<StackNavParams, 'AddPlace'>;

export default function AddPlace({ navigation }: ScreenProps) {
  const createPlaceHandler = async (place: Place) => {
    await insertPlace(place);
    navigation.navigate('AllPlaces');
  };

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}
