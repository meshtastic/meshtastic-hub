import type React from 'react';

import { ColorSwatchIcon, MoonIcon, SunIcon } from '@heroicons/react/outline';

export interface ThemeSelectorProps {
  darkmode: boolean;
  setDarkmode: React.Dispatch<React.SetStateAction<boolean>>;
}

const ThemeSelector = (props: ThemeSelectorProps) => {
  return (
    <div className="flex h-10 text-gray-600 bg-white border rounded-md shadow-md dark:bg-gray-700 dark:text-gray-100">
      <div className="flex justify-between w-full px-2 my-auto">
        <div className="flex my-auto ">
          <ColorSwatchIcon className="w-5 h-5 my-auto mr-2" />
          <div className="my-auto text-lg">Theme</div>
        </div>
        <div className="flex space-x-2">
          <div
            className="flex w-8 h-8 my-auto text-gray-600 bg-white border rounded-full shadow-md cursor-pointer hover:bg-gray-100"
            onClick={() => {
              props.setDarkmode(false);
            }}
          >
            <SunIcon className="w-4 h-4 m-auto" />
          </div>
          <div
            className="flex w-8 h-8 my-auto text-gray-200 bg-gray-700 border rounded-full shadow-md cursor-pointer hover:bg-gray-800"
            onClick={() => {
              props.setDarkmode(true);
            }}
          >
            <MoonIcon className="w-4 h-4 m-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;
