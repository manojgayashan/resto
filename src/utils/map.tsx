export const createRegion = (
  latitude: number,
  longitude: number,
  zoom: number = 0.01
) => {
  return {
    latitude,
    longitude,
    latitudeDelta: zoom,
    longitudeDelta: zoom,
  };
};
