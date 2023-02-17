import { getCurrentPositionAsync } from 'expo-location';
import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { GlobalStyles } from '../../constants/styles';
import { GeoPoint, Place } from '../../types/places';
import Button from '../ui/Button';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';

interface Props {
  onCreatePlace: (place: Place) => void;
}

export default function PlaceForm({ onCreatePlace }: Props) {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const [pickedLocation, setPickedLocation] = useState<
    { lat: number; lng: number; address?: string } | undefined
  >();
  const [pickedLocationAddress, setPickedLocationAddress] = useState<
    string | undefined
  >();

  const changeTitleHandler = (title: string) => {
    setEnteredTitle(title);
  };

  const takeImageHandler = useCallback((imageUri: string) => {
    setSelectedImage(imageUri);
  }, []);

  const pickLocationHandler = useCallback(
    (location: { point: GeoPoint; address?: string }) => {
      setPickedLocation(location.point);
      setPickedLocationAddress(location.address);
    },
    []
  );

  const savePlaceHandler = () => {
    if (!pickedLocation) {
      return;
    }

    onCreatePlace({
      id: `${new Date().getTime()}`,
      title: enteredTitle,
      imageUri: selectedImage ?? '',
      address: pickedLocationAddress ?? '',
      location: {
        lat: pickedLocation.lat,
        lng: pickedLocation.lng,
      },
    });
  };

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>

      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />

      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: GlobalStyles.colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: GlobalStyles.colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: GlobalStyles.colors.primary100,
  },
});
