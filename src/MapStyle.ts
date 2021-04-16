export interface MapStyle {
  title: string,
  url: string,
};

export const MapStyles = {
  Light: { title: 'Light', url: 'mapbox://styles/mapbox/light-v10' } as MapStyle,
  Dark: { title: 'Dark', url: 'mapbox://styles/mapbox/dark-v10' } as MapStyle,
  Satellite: { title: 'Satellite', url: 'mapbox://styles/mapbox/satellite-v9' } as MapStyle,
}

export function getDefaultMapStyleForMode (darkmode: Boolean) {
  return darkmode ? MapStyles.Dark : MapStyles.Light;
}