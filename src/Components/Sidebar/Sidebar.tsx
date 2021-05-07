import React, { useState } from 'react';

import type { position } from 'src/App';

import {
  ChatAltIcon,
  ColorSwatchIcon,
  LocationMarkerIcon,
  MapIcon,
} from '@heroicons/react/outline';

import logoBlack from '../../../public/Mesh_Logo_Black.svg';
import logoWhite from '../../../public/Mesh_Logo_White.svg';
import type { NodeDataProperties } from '../DataTable/DataTable';
import Coordinates from './Coordinates';
import type { MapStyle } from './MapStyleSelector';
import MapStyleSelector from './MapStyleSelector';
import MQTT from './MQTT';

export interface SidebarProps {
  nodes: NodeDataProperties[];
  position: position;
  darkmode: boolean;
  mapStyle: MapStyle;
  setDarkmode: React.Dispatch<React.SetStateAction<boolean>>;
  setMapStyle: React.Dispatch<React.SetStateAction<MapStyle>>;
}

const Sidebar = (props: SidebarProps) => {
  const [activeElement, setActiveElement] = useState<React.ReactElement>();
  return (
    <div
      className="
     flex flex-col md:flex-row relative md:h-full bg-white dark:bg-gray-700 shadow-md"
    >
      <div className="h-full shadow-inner">{activeElement}</div>
      <div className="m-1 flex flex-row md:flex-col">
        <nav className="flex flex-row md:flex-col space-x-2 md:space-x-0 space-y-0 md:space-y-2">
          <img
            className="w-10 md:py-3"
            src={props.darkmode ? logoWhite : logoBlack}
          />
          <div
            className="flex group mx-auto bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-900 rounded-md cursor-pointer"
            onClick={() => {
              setActiveElement(<MQTT />);
            }}
          >
            <ChatAltIcon className="w-10 h-10 p-2 my-auto text-gray-600 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-200" />
          </div>
          <div
            className="flex group mx-auto bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-900 rounded-md cursor-pointer"
            onClick={() => {
              console.log(activeElement);

              setActiveElement(
                <MapStyleSelector
                  mapStyle={props.mapStyle}
                  setMapStyle={props.setMapStyle}
                  darkmode={props.darkmode}
                />,
              );
            }}
          >
            <MapIcon className="w-10 h-10 p-2 my-auto text-gray-600 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-200" />
          </div>

          <div
            className="flex group mx-auto bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-900 rounded-md cursor-pointer"
            onClick={() => {
              setActiveElement(<Coordinates position={props.position} />);
            }}
          >
            <LocationMarkerIcon className="w-10 h-10 p-2 my-auto text-gray-600 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-200" />
          </div>
          <div
            className="flex group mx-auto bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-900 rounded-md cursor-pointer"
            onClick={() => {
              props.setDarkmode(!props.darkmode);
            }}
          >
            <ColorSwatchIcon className="w-10 h-10 p-2 my-auto text-gray-600 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-200" />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
