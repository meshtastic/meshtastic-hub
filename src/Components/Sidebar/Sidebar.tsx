import React from 'react';

import type { position } from 'src/App';

import logoBlack from '../../../public/Mesh_Logo_Black.svg';
import logoWhite from '../../../public/Mesh_Logo_White.svg';
import Coordinates from './Coordinates';
import DarkmodeToggle from './DarkmodeToggle';
import MapStyleSelect, { MapStyle } from './MapStyleSelect';

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
    <div className="absolute right-0 m-4 w-56">
      <div className="bg-white dark:bg-gray-700 rounded-md">
        <div className="flex items-center justify-center py-6">
          <img className="h-12" src={props.darkmode ? logoWhite : logoBlack} />
        </div>
        <nav className="space-y-2 pb-2 px-2">
          <MapStyleSelect
            mapStyle={props.mapStyle}
            setMapStyle={props.setMapStyle}
          />

          <Coordinates position={props.position} />

          <DarkmodeToggle
            darkmode={props.darkmode}
            setDarkmode={props.setDarkmode}
          />
          {/* <MQTT /> */}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
