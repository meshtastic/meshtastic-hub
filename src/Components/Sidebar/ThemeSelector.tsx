import React from 'react';

import { ColorSwatchIcon, MoonIcon, SunIcon } from '@heroicons/react/outline';

export interface ThemeSelectorProps {
  darkmode: boolean;
  setDarkmode: React.Dispatch<React.SetStateAction<boolean>>;
}

const ThemeSelector = (props: ThemeSelectorProps) => {
  return (
    <div className="flex bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-100 h-10 shadow-md border rounded-md">
      <div className="flex justify-between my-auto px-2 w-full">
        <div className="flex my-auto ">
          <ColorSwatchIcon className="w-5 h-5 mr-2 my-auto" />
          <div className="text-lg my-auto">Theme</div>
        </div>
        <div className="flex space-x-2">
          <div
            className="flex my-auto h-8 w-8 rounded-full cursor-pointer shadow-md bg-white hover:bg-gray-100 border text-gray-600"
            onClick={() => {
              props.setDarkmode(false);
            }}
          >
            <SunIcon className="m-auto w-4 h-4" />
          </div>
          <div
            className="flex my-auto h-8 w-8 rounded-full cursor-pointer shadow-md bg-gray-700 hover:bg-gray-800 border text-gray-200"
            onClick={() => {
              props.setDarkmode(true);
            }}
          >
            <MoonIcon className="m-auto w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;
