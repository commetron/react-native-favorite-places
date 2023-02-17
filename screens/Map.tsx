import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import MapView, { MapPressEvent, Marker, Region } from 'react-native-maps';

import { StackNavParams } from '../App';
import IconButton from '../components/ui/IconButton';
import { GeoPoint } from '../types/places';

type ScreenProps = NativeStackScreenProps<StackNavParams, 'Map'>;

export default function Map({ route, navigation }: ScreenProps) {
  const initialLocation = route.params.location;

  const [selectedLocation, setSelectedLocation] = useState<
    GeoPoint | undefined
  >(initialLocation);

  const region: Region = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event: MapPressEvent) => {
    if (initialLocation) {
      return;
    }

    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ lat: latitude, lng: longitude });
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        'No location picked',
        'You have to pick a location (by tapping on the map)!'
      );
      return;
    }

    navigation.navigate('AddPlace', {
      pickedLocation: selectedLocation,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if (initialLocation) {
      return;
    }

    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon='save'
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [initialLocation, navigation, savePickedLocationHandler]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title='Picked location'
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
