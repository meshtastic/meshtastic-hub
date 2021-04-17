import React, { Dispatch, SetStateAction } from 'react';

import type { position } from 'src/App';

import logoBlack from '../../../public/Mesh_Logo_Black.svg';
import logoWhite from '../../../public/Mesh_Logo_White.svg';
import DarkmodeToggle from '../Generic/DarkmodeToggle';
import Dropdown, { MapStyle } from '../Generic/Dropdown';
import Coordinates from './Coordinates';

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
  setDarkmode: Dispatch<SetStateAction<boolean>>;
  setMapStyle: Dispatch<SetStateAction<MapStyle>>;
}

const Sidebar = (props: SidebarProps) => {
  return (
    <div className="absolute right-0 m-4 shadow-md w-56">
      <div className="bg-white dark:bg-gray-700 rounded-md">
        <div className="flex items-center justify-center py-6">
          <img className="h-12" src={props.darkmode ? logoWhite : logoBlack} />
        </div>
        <nav className="space-y-2 pb-2">
          <Dropdown mapStyle={props.mapStyle} setMapStyle={props.setMapStyle} />

          <Coordinates position={props.position} />

          <DarkmodeToggle
            darkmode={props.darkmode}
            setDarkmode={props.setDarkmode}
          />
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
