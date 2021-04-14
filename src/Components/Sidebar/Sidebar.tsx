import React from 'react';

import logo from '../../../public/Mesh_Logo_Black.svg';
import Dropdown from '../Generic/Dropdown';
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
    <div className="absolute right-0 hidden lg:block my-4 ml-4 shadow-lg w-56 mr-4">
      <div className="bg-white h-full rounded-md dark:bg-gray-700">
        <div className="flex items-center justify-center pt-6">
          <img className="w-14" src={logo} />
        </div>
        <nav className="mt-6">
          <div>
            <span className="mx-2 text-sm">Map Type</span>
            <Dropdown />
          </div>

          <div className="flex">
            <div className="flex w-full mx-2 mb-2 shadow-md border rounded-md">
              <div className="mx-auto text-lg ">
                Lat: <small>{props.currentPosition.lat}</small>, Lng:{' '}
                <small>{props.currentPosition.lng}</small>
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="flex w-full mx-2 mb-2 shadow-md border rounded-md">
              <div className="mx-auto text-lg ">
                <button
                  onClick={() => {
                    props.setDarkmode(!props.darkmode);
                  }}
                >
                  Toggle darkmode
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
