import defaults from './defaults';

export const currentBrowserLocation = () => {
  let locatione;
  navigator.geolocation.getCurrentPosition((location) => {
    locatione = {
      lat: location.coords.latitude,
      lng: location.coords.longitude
    }
  })

  return locatione;
}


