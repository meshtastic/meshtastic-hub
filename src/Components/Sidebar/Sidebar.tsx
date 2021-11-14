import React, { useState } from 'react';

import logoBlack from '/Mesh_Logo_Black.svg';
import logoWhite from '/Mesh_Logo_White.svg';
import type { position } from 'src/App';

import {
  ChatAltIcon,
  ColorSwatchIcon,
  LocationMarkerIcon,
  MapIcon,
} from '@heroicons/react/outline';

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
    <div className="relative flex flex-col bg-white shadow-md md:flex-row md:h-full dark:bg-gray-700">
      <div className="h-full shadow-inner">{activeElement}</div>
      <div className="flex flex-row m-1 md:flex-col">
        <nav className="flex justify-between w-full gap-2 md:flex-col">
          <div className="flex gap-2 md:flex-col">
            <img
              className="w-10 md:py-3"
              src={props.darkmode ? logoWhite : logoBlack}
            />
            <div
              className="flex mx-auto bg-gray-100 rounded-md cursor-pointer group dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-900"
              onClick={() => {
                setActiveElement(<MQTT />);
              }}
            >
              <ChatAltIcon className="w-10 h-10 p-2 my-auto text-gray-600 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-200" />
            </div>
            <div
              className="flex mx-auto bg-gray-100 rounded-md cursor-pointer group dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-900"
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
              className="flex mx-auto bg-gray-100 rounded-md cursor-pointer group dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-900"
              onClick={() => {
                setActiveElement(<Coordinates position={props.position} />);
              }}
            >
              <LocationMarkerIcon className="w-10 h-10 p-2 my-auto text-gray-600 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-200" />
            </div>
            <div
              className="flex mx-auto bg-gray-100 rounded-md cursor-pointer group dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-900"
              onClick={() => {
                props.setDarkmode(!props.darkmode);
              }}
            >
              <ColorSwatchIcon className="w-10 h-10 p-2 my-auto text-gray-600 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-200" />
            </div>
          </div>
          <div className="flex">
            <a
              href="https://vercel.com?utm_source=meshtastic&utm_campaign=oss"
              target="_blank"
              className="flex w-10 h-10 text-xl rounded-md hover:bg-gray-200 dark:hover:bg-gray-900"
            >
              <span className="m-auto">▲</span>
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
