import React from 'react';

import { FaAsterisk } from 'react-icons/fa';

import logo from '../../../public/design/logo/svg/Mesh_Logo_Black.svg';
import Dropdown from '../Generic/Dropdown';
import type { NodeDataProperties } from './Node';

export interface SidebarProps {
  nodes: NodeDataProperties[];
}

const Sidebar = (props: SidebarProps) => {
  return (
    <div className="absolute right-0 hidden lg:block my-4 ml-4 shadow-lg w-56 mr-4">
      <div className="bg-white h-full rounded-2xl dark:bg-gray-700">
        <div className="flex items-center justify-center pt-6">
          <img className="w-14" src={logo} />
        </div>
        <nav className="mt-6">
          <div>
            <a
              className="w-full font-thin uppercase text-primary flex items-center p-4 my-2 transition-colors duration-200 justify-start bg-gradient-to-r from-white to-blue-100 border-r-4 border-primary dark:from-gray-700 dark:to-gray-800"
              href="#"
            >
              <span className="text-left">
                <FaAsterisk />
              </span>
              <span className="mx-4 text-sm font-normal">Item 1</span>
            </a>
            <a
              className="w-full font-thin uppercase text-gray-500 dark:text-gray-200 flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-primary"
              href="#"
            >
              <span className="text-left">
                <FaAsterisk />
              </span>
              <span className="mx-4 text-sm font-normal">Item 2</span>
            </a>
            <div>
              <span className="mx-4 text-sm font-normal">Map Type</span>
              <Dropdown />
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
