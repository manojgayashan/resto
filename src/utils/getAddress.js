import axios from 'axios';

const GOOGLE_API_KEY = 'AIzaSyDb3nFvDwC8faGTV4W3ohNMIbLaSoMvxF8';

export const getAddressFromCoords = async (lat, lng) => {
  try {
    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
    );

    if (res.data.results.length > 0) {
      return res.data.results[0].formatted_address;
    }

    return 'Address not found';
  } catch (err) {
    console.log(err);
    return 'Error getting address';
  }
};
