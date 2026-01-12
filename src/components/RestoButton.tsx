import React from 'react';
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';

type ButtonVariant = 'solid' | 'outline' | 'ghost';
type ButtonSize = 'xsm'|'sm' | 'md' | 'lg';

interface RestoButtonProps {
  title?: string;
  icon?: React.ReactNode;

  onPress: () => void;

  variant?: ButtonVariant;
  size?: ButtonSize;

  disabled?: boolean;
  loading?: boolean;

  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;

  radius?: number;
  iconSpacing?: number;
  width?:number;

  style?: ViewStyle;
  textStyle?: TextStyle;
  marginRight?: number;
}

const SIZE_MAP = {
  xsm: { height: 30, textSize: 12, paddingHorizontal: 8 },
  sm: { height: 36, textSize: 12, paddingHorizontal: 12 },
  md: { height: 40, textSize: 14, paddingHorizontal: 12 },
  lg: { height: 60, textSize: 18, paddingHorizontal: 20 },
};

const RestoButton: React.FC<RestoButtonProps> = ({
  title,
  icon,
  onPress,
  variant = 'solid',
  size = 'md',
  disabled = false,
  loading = false,

  backgroundColor = '#4F46E5',
  textColor = '#FFFFFF',
  borderColor = '#4F46E5',

  radius = 100,
  iconSpacing = 8,
  style,
  textStyle,
  marginRight = 0,
  width
}) => {
  const isDisabled = disabled || loading;
  const sizeConfig = SIZE_MAP[size];

  const getContainerStyle = (): ViewStyle => {
    // If icon-only, make square button
    const isIconOnly = !!icon && !title;

    return {
      height: sizeConfig.height,
      width: isIconOnly ? sizeConfig.height : width,
      borderRadius: radius,
      alignItems: 'center',
      justifyContent: 'center',
      opacity: isDisabled ? 0.6 : 1,
      paddingHorizontal: isIconOnly ? 0 : sizeConfig.paddingHorizontal,
      marginRight,
      backgroundColor:
        variant === 'solid'
          ? backgroundColor
          : variant === 'ghost'
          ? 'transparent'
          : 'transparent',
      borderWidth: variant === 'outline' ? 1 : 0,
      borderColor: variant === 'outline' ? borderColor : undefined,
    };
  };

  const getContentColor = () => {
    return textColor;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isDisabled}
      onPress={onPress}
      style={[getContainerStyle(), style]}
    >
      {loading ? (
        <ActivityIndicator color={getContentColor()} />
      ) : (
        <View style={styles.content}>
          {icon && <View style={{ marginRight: title ? iconSpacing : 0 }}>{icon}</View>}
          {title && (
            <Text style={[styles.text, { color: getContentColor(), fontSize: sizeConfig.textSize }, textStyle]}>
              {title}
            </Text>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default RestoButton;

const styles = StyleSheet.create({
  text: {
    fontWeight: '600',
    letterSpacing: 0.4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
