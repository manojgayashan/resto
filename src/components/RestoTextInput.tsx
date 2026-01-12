import React from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  TextStyle,
  ViewStyle,
  TextInputProps,
} from 'react-native';

type InputVariant = 'solid' | 'outline' | 'ghost';
type InputSize = 'sm' | 'md' | 'lg';

interface RestoTextInputProps extends TextInputProps {
  variant?: InputVariant;
  size?: InputSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: boolean;

  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
}

const SIZE_MAP = {
  sm: { height: 40, paddingHorizontal: 12, fontSize: 14 },
  md: { height: 48, paddingHorizontal: 16, fontSize: 16 },
  lg: { height: 56, paddingHorizontal: 20, fontSize: 18 },
};

const RestoTextInput: React.FC<RestoTextInputProps> = ({
  variant = 'outline',
  size = 'md',
  leftIcon,
  rightIcon,
  error = false,
  containerStyle,
  inputStyle,
  style,
  ...rest
}) => {
  const sizeConfig = SIZE_MAP[size];

  const getContainerStyle = (): ViewStyle => {
    let base: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      height: sizeConfig.height,
      borderRadius: 50,
      paddingHorizontal: sizeConfig.paddingHorizontal,
      backgroundColor: variant === 'solid' ? '#F3F4F6' : 'transparent',
      borderWidth: variant === 'outline' ? 1 : 0,
      borderColor: error ? '#EF4444' : variant === 'outline' ? '#D1D5DB' : 'transparent',
    };
    return base;
  };

  return (
    <View style={[getContainerStyle(), containerStyle]}>
      {leftIcon && <View style={{ marginRight: 8 }}>{leftIcon}</View>}

      <TextInput
        style={[
          { flex: 1, fontSize: sizeConfig.fontSize, color: '#111827' },
          inputStyle,
        ]}
        placeholderTextColor="#9CA3AF"
        {...rest}
      />

      {rightIcon && <View style={{ marginLeft: 8 }}>{rightIcon}</View>}
    </View>
  );
};

export default RestoTextInput;
