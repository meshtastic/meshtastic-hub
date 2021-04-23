import React from 'react';

import type { position } from 'src/App';

import { ChatAltIcon } from '@heroicons/react/outline';

import logoBlack from '../../../public/Mesh_Logo_Black.svg';
import logoWhite from '../../../public/Mesh_Logo_White.svg';
import Coordinates from './Coordinates';
import MapStyleSelector, { MapStyle } from './MapStyleSelector';
import ThemeSelector from './ThemeSelector';

export interface NodeDataProperties {
  id: string;
  lastHeard?: number;
  longName?: string;
  position?: {
    altitude?: number;
    batteryLevel?: number;
    latitudeI?: number;
    longitudeI?: number;
    time?: number;
  };
  user?: {
    hwModel?: string; //enum
    id?: string;
    longName?: string;
    macaddr?: string;
    shortName?: string;
  };
}

export interface SidebarProps {
  nodes: NodeDataProperties[];
  position: position;
  darkmode: boolean;
  mapStyle: MapStyle;
  setDarkmode: React.Dispatch<React.SetStateAction<boolean>>;
  setMapStyle: React.Dispatch<React.SetStateAction<MapStyle>>;
}

const Sidebar = (props: SidebarProps) => {
  return (
    <div className="absolute right-0 m-4 w-72">
      <div className="bg-white dark:bg-gray-700 rounded-md">
        <div className="flex items-center justify-center py-6">
          <img className="h-12" src={props.darkmode ? logoWhite : logoBlack} />
        </div>
        <nav className="space-y-2 pb-2 px-2">
          <div className="flex bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-100 shadow-md border rounded-md">
            <div className="px-2 space-y-2 mb-2 my-auto w-full">
              <div className="flex border-b h-10">
                <ChatAltIcon className="w-5 h-5 mr-2 my-auto" />
                <div className="text-lg my-auto">MQTT Messages</div>
              </div>
              <div className="animate-pulse h-6 bg-gray-200 rounded-md"></div>
              <div className="animate-pulse h-6 bg-gray-200 rounded-md"></div>
              <div className="animate-pulse h-6 bg-gray-200 rounded-md"></div>
              <div className="animate-pulse h-6 bg-gray-200 rounded-md"></div>
              <div className="animate-pulse h-6 bg-gray-200 rounded-md"></div>
            </div>
          </div>

          <MapStyleSelector
            mapStyle={props.mapStyle}
            setMapStyle={props.setMapStyle}
            darkmode={props.darkmode}
          />

          <ThemeSelector
            darkmode={props.darkmode}
            setDarkmode={props.setDarkmode}
          />
          <Coordinates position={props.position} />
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
