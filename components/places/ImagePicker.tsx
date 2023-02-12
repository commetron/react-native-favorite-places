import {
  ImagePickerResult,
  PermissionStatus,
  launchCameraAsync,
  useCameraPermissions,
} from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native';

import { GlobalStyles } from '../../constants/styles';
import OutlinedButton from '../ui/OutlinedButton';

interface Props {}

export default function ImagePicker({}: Props) {
  const [cameraPermissionInfo, requestCameraPermission] =
    useCameraPermissions();
  const [pickedImage, setPickedImage] = useState<string | undefined>(undefined);

  const verifyCameraPermission = async () => {
    if (cameraPermissionInfo?.status === PermissionStatus.UNDETERMINED) {
      const response = await requestCameraPermission();
      return response.granted;
    }

    if (cameraPermissionInfo?.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permissions to use this app.'
      );
      return false;
    }

    return true;
  };

  const takeImageHandler = async () => {
    const hasCameraPermission = await verifyCameraPermission();

    if (!hasCameraPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setPickedImage(image.assets?.at(0)?.uri);
  };

  let imagePreview = <Text>No image taken yet</Text>;

  if (pickedImage != null) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>

      <OutlinedButton icon='camera' onPress={takeImageHandler}>
        Take Image
      </OutlinedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
