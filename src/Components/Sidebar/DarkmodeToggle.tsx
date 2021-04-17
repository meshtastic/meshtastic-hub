import React, { Dispatch, SetStateAction } from 'react';

import { Switch } from '@headlessui/react';
import { MoonIcon, SunIcon } from '@heroicons/react/outline';

export interface DarkmodeToggleProps {
  darkmode: boolean;
  setDarkmode: Dispatch<SetStateAction<boolean>>;
}

const DarkmodeToggle = (props: DarkmodeToggleProps) => {
  return (
    <div className="mx-2">
      <Switch
        checked={props.darkmode}
        onChange={props.setDarkmode}
        className="flex bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-100 cursor-pointer shadow-md w-full h-10 items-center rounded-full p-1 duration-300 ease-in-out my-auto focus:outline-none"
      >
        <span
          className={`${props.darkmode ? 'translate-x-full' : 'translate-x-0'}
            flex pointer-events-none h-[34px] w-24 rounded-full bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 shadow-md transform transition ease-in-out duration-200`}
        >
          {props.darkmode ? (
            <div className="flex m-auto">
              <SunIcon className="w-5 h-5 mr-1 my-auto" /> Light
            </div>
          ) : (
            <div className="flex m-auto">
              <MoonIcon className="w-5 h-5 mr-1 my-auto" />
              Dark
            </div>
          )}
        </span>
      </Switch>
    </div>
  );
};

export default DarkmodeToggle;
