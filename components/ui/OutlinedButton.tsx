import { Ionicons } from '@expo/vector-icons';
import React, { ReactNode } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { GlobalStyles } from '../../constants/styles';

interface Props {
  children: ReactNode;
  icon: any;
  disabled?: boolean;
  onPress: () => void;
}

export default function OutlinedButton({
  children,
  icon,
  disabled = false,
  onPress,
}: Props) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && !disabled && styles.pressed,
      ]}
      onPress={!disabled ? onPress : undefined}
    >
      <Ionicons
        style={styles.icon}
        name={icon}
        size={18}
        color={GlobalStyles.colors.primary500}
      />
      <Text style={[styles.text]}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary500,
  },
  pressed: {
    opacity: 0.5,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    color: GlobalStyles.colors.primary500,
  },
});
