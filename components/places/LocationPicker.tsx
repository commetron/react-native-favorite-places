import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  PermissionStatus,
  getCurrentPositionAsync,
  useForegroundPermissions,
} from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';

import { StackNavParams } from '../../App';
import { GlobalStyles } from '../../constants/styles';
import { getMapPreview } from '../../util/location';
import OutlinedButton from '../ui/OutlinedButton';

type NavProps = NativeStackNavigationProp<StackNavParams>;
type RouteProps = RouteProp<StackNavParams>;

interface Props {}

export default function LocationPicker({}: Props) {
  const isFocused = useIsFocused();
  const { navigate } = useNavigation<NavProps>();
  const { params: routeParams } = useRoute<RouteProps>();

  useEffect(() => {
    if (routeParams?.pickedLocation) {
      setPickedLocation(routeParams.pickedLocation);
    }
  }, [routeParams, isFocused]);

  const [locationPermissionInfo, requestLocationPermission] =
    useForegroundPermissions();

  const [isLoading, setIsLoading] = useState(false);
  const [pickedLocation, setPickedLocation] = useState<
    { lat: number; lng: number } | undefined
  >(undefined);

  const verifyLocationPermission = async () => {
    if (
      locationPermissionInfo?.status === PermissionStatus.UNDETERMINED ||
      locationPermissionInfo?.status === PermissionStatus.DENIED
    ) {
      if (locationPermissionInfo?.canAskAgain) {
        const response = await requestLocationPermission();
        return response.granted;
      } else {
        Alert.alert(
          'Insufficient permissions!',
          'You need to grant location permissions to use this app.'
        );
        return false;
      }
    }

    return true;
  };

  const getLocationHandler = async () => {
    const hasLocationPermission = await verifyLocationPermission();

    if (!hasLocationPermission) {
      return;
    }

    setIsLoading(true);
    const location = await getCurrentPositionAsync();
    setIsLoading(false);

    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };

  const pickOnMapHandler = () => {
    navigate('Map');
  };

  let locationPreview = <Text>No location picked yet.</Text>;
  if (isLoading) {
    locationPreview = <Text>Location is loading...</Text>;
  } else if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton
          icon='location'
          disabled={isLoading}
          onPress={getLocationHandler}
        >
          Locate User
        </OutlinedButton>
        <OutlinedButton
          icon='map'
          disabled={isLoading}
          onPress={pickOnMapHandler}
        >
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
