import React from 'react';

import { Switch } from '@headlessui/react';
import { ColorSwatchIcon, MoonIcon, SunIcon } from '@heroicons/react/outline';

export interface DarkmodeToggleProps {
  darkmode: boolean;
  setDarkmode: React.Dispatch<React.SetStateAction<boolean>>;
}

const DarkmodeToggle = (props: DarkmodeToggleProps) => {
  return (
    <div className="flex h-8 justify-between bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-100 border rounded-md shadow-md px-2">
      <div className="flex my-auto text-lg">
        <ColorSwatchIcon className="my-auto mr-2 w-4 h-4" />
        Theme:
      </div>
      <Switch
        checked={props.darkmode}
        onChange={props.setDarkmode}
        className="flex bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-100 cursor-pointer shadow-md w-14 h-5 items-center rounded-full duration-300 ease-in-out my-auto focus:outline-none"
      >
        <span
          className={`
            flex pointer-events-none h-6 w-6 rounded-full bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 shadow-md transform transition ease-in-out duration-200 ${
              props.darkmode ? 'translate-x-8' : 'translate-x-0'
            }`}
        >
          {props.darkmode ? (
            <SunIcon className="m-auto w-4 h-4 mr-1" />
          ) : (
            <MoonIcon className="m-auto w-4 h-4 mr-1" />
          )}
        </span>
      </Switch>
    </div>
  );
};

export default DarkmodeToggle;
