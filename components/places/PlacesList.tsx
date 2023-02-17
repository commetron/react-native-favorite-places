import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { GlobalStyles } from '../../constants/styles';
import { Place } from '../../types/places';
import PlaceItem from './PlaceItem';

interface Props {
  places: Place[];
}

export default function PlacesList({ places }: Props) {
  if (places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(el) => el.id}
      renderItem={(el) => <PlaceItem place={el.item} onSelect={() => {}} />}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  fallbackText: {
    fontSize: 16,
    textAlign: 'center',
    color: GlobalStyles.colors.primary200,
  },
});
