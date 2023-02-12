import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { Place } from '../../types/places';

interface Props {
  place: Place;
  onSelect: () => void;
}

export default function PlaceItem({ place, onSelect }: Props) {
  const { imageUri, title, address } = place;

  return (
    <Pressable onPress={onSelect}>
      <Image source={{ uri: imageUri }} />
      <View>
        <Text>{title}</Text>
        <Text>{address}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
