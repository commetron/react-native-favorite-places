import {
  PermissionStatus,
  launchCameraAsync,
  useCameraPermissions,
} from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';

import { GlobalStyles } from '../../constants/styles';
import OutlinedButton from '../ui/OutlinedButton';

interface Props {
  onTakeImage: (imageUri: string) => void;
}

export default function ImagePicker({ onTakeImage }: Props) {
  const [cameraPermissionInfo, requestCameraPermission] =
    useCameraPermissions();
  const [pickedImage, setPickedImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (pickedImage) {
      onTakeImage(pickedImage);
    }
  }, [pickedImage, onTakeImage]);

  const verifyCameraPermission = async () => {
    if (
      cameraPermissionInfo?.status === PermissionStatus.UNDETERMINED ||
      cameraPermissionInfo?.status === PermissionStatus.DENIED
    ) {
      if (cameraPermissionInfo.canAskAgain) {
        const response = await requestCameraPermission();
        return response.granted;
      } else {
        Alert.alert(
          'Insufficient permissions!',
          'You need to grant camera permissions to use this app.'
        );
        return false;
      }
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

    if (image != null && image.assets != null) {
      setPickedImage(image.assets[0].uri);
    }
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
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
