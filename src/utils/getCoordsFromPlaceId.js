const GOOGLE_API_KEY = 'AIzaSyDb3nFvDwC8faGTV4W3ohNMIbLaSoMvxF8'; // Get it from Google Cloud

async function getPlaceCoordinates(placeId) {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry&key=${GOOGLE_API_KEY}`
    );
    const data = await response.json();

    if (data.status === 'OK') {
      const location = data.result.geometry.location;
      console.log('Latitude:', location.lat);
      console.log('Longitude:', location.lng);
      return location; // { lat: xx, lng: xx }
    } else {
      console.log('Error fetching place:', data.status);
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
}