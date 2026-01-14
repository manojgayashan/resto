import { Platform, Linking } from 'react-native';

export const openDirections = (
  latitude: number,
  longitude: number,
  label = 'Destination'
) => {
  const url = Platform.select({
    ios: `http://maps.apple.com/?daddr=${latitude},${longitude}&dirflg=d`,
    android: `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving`,
  });

  Linking.openURL(url!);
};
