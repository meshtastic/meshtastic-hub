import React, { Dispatch, Fragment, SetStateAction } from 'react';

import { Listbox } from '@headlessui/react';
import { CheckIcon, MapIcon, SelectorIcon } from '@heroicons/react/outline';

export interface MapStyle {
  title: string;
  url: string;
}

export interface MapStyleSelectProps {
  mapStyle: MapStyle;
  setMapStyle: Dispatch<SetStateAction<MapStyle>>;
}

export const MapStyles = {
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
  return currentMapStyle === MapStyles.Satellite
    ? MapStyles.Satellite
    : darkmode
    ? MapStyles.Dark
    : MapStyles.Light;
}

const MapStyleSelect = (props: MapStyleSelectProps) => {
  return (
    <div className="relative text-gray-600 dark:text-gray-100">
      <Listbox value={props.mapStyle} onChange={props.setMapStyle}>
        <Listbox.Button className="flex relative w-full py-1 px-2 text-left bg-white dark:bg-gray-700 border rounded-md shadow-md cursor-default focus:outline-none">
          <MapIcon className="h-5 w-5 mr-2 my-auto" />
          <span className="block truncate ">{props.mapStyle.title}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <SelectorIcon className="w-5 h-5" />
          </span>
        </Listbox.Button>
        <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white dark:bg-gray-700 rounded-md border shadow-md max-h-60 focus:outline-none z-40">
          {Object.entries(MapStyles).map(([name, mapStyle], index) => (
            <Listbox.Option key={index} value={mapStyle} as={Fragment}>
              {({ selected, active }) => (
                <div
                  className={`${
                    active
                      ? 'text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-600'
                      : 'text-gray-800 dark:text-gray-200'
                  }
                          cursor-pointer select-none relative py-2 pl-10 pr-4`}
                >
                  <span
                    className={`${
                      selected ? 'font-medium' : 'font-normal'
                    } block truncate`}
                  >
                    {name}
                  </span>
                  {selected ? (
                    <span
                      className={`${
                        active ? 'text-amber-600' : 'text-amber-600'
                      }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                    >
                      <CheckIcon className="w-5 h-5" />
                    </span>
                  ) : null}
                </div>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
};

export default MapStyleSelect;
