import type React from 'react';

import { MapIcon } from '@heroicons/react/outline';

export interface MapStyle {
  title: string;
  url: string;
}

export interface MapStyleSelectorProps {
  mapStyle: MapStyle;
  setMapStyle: React.Dispatch<React.SetStateAction<MapStyle>>;
  darkmode: boolean;
}

export const MapStyles = {
  Streets: {
    title: 'Streets',
    url: 'mapbox://styles/mapbox/streets-v11',
  } as MapStyle,
  Outdoors: {
    title: 'Outdoors',
    url: 'mapbox://styles/mapbox/outdoors-v11',
  } as MapStyle,

  Light: {
    title: 'Light',
    url: 'mapbox://styles/mapbox/light-v10',
  } as MapStyle,
  Dark: { title: 'Dark', url: 'mapbox://styles/mapbox/dark-v10' } as MapStyle,
  Satellite: {
    title: 'Satellite',
    url: 'mapbox://styles/mapbox/satellite-v9',
  } as MapStyle,
};

export function getDefaultMapStyle(
  darkmode: Boolean,
  currentMapStyle: MapStyle,
) {
  return currentMapStyle === MapStyles.Satellite ||
    currentMapStyle === MapStyles.Outdoors ||
    currentMapStyle === MapStyles.Streets
    ? currentMapStyle
    : darkmode
    ? MapStyles.Dark
    : MapStyles.Light;
}

const MapStyleSelector = (props: MapStyleSelectorProps) => {
  return (
    <div className="flex w-full h-10 text-gray-600 bg-white border rounded-md shadow-md dark:bg-gray-700 dark:text-gray-100 md:w-72">
      <div className="flex justify-between w-full px-2 my-auto">
        <div className="flex my-auto ">
          <MapIcon className="w-5 h-5 my-auto mr-2" />
          <div className="my-auto text-lg">Map</div>
        </div>
        <div className="flex space-x-2">
          <div
            className="flex w-8 h-8 my-auto rounded-full shadow-md cursor-pointer hover:opacity-80"
            onClick={() => {
              props.setMapStyle(MapStyles.Streets);
            }}
          >
            <img src="/mapstyle_streets.png" />
          </div>
          <div
            className="flex w-8 h-8 my-auto rounded-full shadow-md cursor-pointer hover:opacity-80"
            onClick={() => {
              props.setMapStyle(MapStyles.Outdoors);
            }}
          >
            <img src="/mapstyle_outdoors.png" />
          </div>
          <div
            className="flex w-8 h-8 my-auto rounded-full shadow-md cursor-pointer hover:opacity-80"
            onClick={() => {
              props.setMapStyle(
                props.darkmode ? MapStyles.Dark : MapStyles.Light,
              );
            }}
          >
            {props.darkmode ? (
              <img src="/mapstyle_dark.png" />
            ) : (
              <img src="/mapstyle_light.png" />
            )}
          </div>
          <div
            className="flex w-8 h-8 my-auto rounded-full shadow-md cursor-pointer hover:opacity-80"
            onClick={() => {
              props.setMapStyle(MapStyles.Satellite);
            }}
          >
            <img src="/mapstyle_satellite.png" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapStyleSelector;
