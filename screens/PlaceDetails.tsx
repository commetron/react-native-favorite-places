import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { StackNavParams } from '../App';
import OutlinedButton from '../components/ui/OutlinedButton';
import { GlobalStyles } from '../constants/styles';
import { Place } from '../types/places';
import { fetchPlaceDetails } from '../util/database';

type ScreenProps = NativeStackScreenProps<StackNavParams, 'PlaceDetails'>;

export default function PlaceDetails({ route, navigation }: ScreenProps) {
  const placeId = route.params.id;
  const [place, setPlace] = useState<Place>();

  useEffect(() => {
    const loadPlaceData = async () => {
      const place = await fetchPlaceDetails(placeId);
      setPlace(place);
      navigation.setOptions({
        title: place?.title ?? '',
      });
    };

    loadPlaceData();
  }, [placeId]);

  const showOnMapHandler = () => {
    navigation.navigate('Map', {
      location: place?.location,
    });
  };

  if (!place) {
    return (
      <View style={styles.fallback}>
        <Text>Loading place data...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{place.address}</Text>
        </View>
        <OutlinedButton icon='map' onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: GlobalStyles.colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
