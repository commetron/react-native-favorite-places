import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

import { StackNavParams } from '../App';
import PlaceForm from '../components/places/PlaceForm';

type ScreenProps = NativeStackScreenProps<StackNavParams>;

export default function AddPlace({}: ScreenProps) {
  return <PlaceForm />;
}
