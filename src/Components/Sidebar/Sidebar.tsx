import React from 'react';

import logoBlack from '../../../public/Mesh_Logo_Black.svg';
import logoWhite from '../../../public/Mesh_Logo_White.svg';
import DarkmodeToggle from '../Generic/DarkmodeToggle';
import Dropdown from '../Generic/Dropdown';
import MQTT from './MQTT';
import type { NodeDataProperties } from './Node';

export interface SidebarProps {
  nodes: NodeDataProperties[];
  currentPosition: {
    lat: number;
    lng: number;
  };
  darkmode: boolean;
  setDarkmode: Function;
}

const Sidebar = (props: SidebarProps) => {
  return (
    <div className="absolute right-0 hidden lg:block my-4 ml-4 shadow-md w-56 mr-4">
      <div className="bg-white dark:bg-gray-700 h-full rounded-md">
        <div className="flex items-center justify-center pt-6">
          <img className="w-14" src={props.darkmode ? logoWhite : logoBlack} />
        </div>
        <nav className="mt-6">
          <div>
            <span className="mx-2 text-sm dark:text-gray-200">Map Type</span>
            <Dropdown />
          </div>

          <div className="flex">
            <div className="flex w-full mx-2 mb-2 shadow-md border rounded-md">
              <div className="mx-auto text-lg dark:text-gray-200">
                Lat: <small>{props.currentPosition.lat}</small>, Lng:{' '}
                <small>{props.currentPosition.lng}</small>
              </div>
            </div>
          </div>
          <MQTT />

          <div className="flex pb-2 justify-between mx-2">
            <div className="text-gray-600 dark:text-gray-100 mr-2 text-xl my-auto font-medium">
              Theme:
            </div>
            <DarkmodeToggle
              darkmode={props.darkmode}
              toggle={() => {
                props.setDarkmode(!props.darkmode);
              }}
            />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
