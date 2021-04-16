import React from 'react';

import type { MapStyle } from '../../MapStyle';

export interface DropdownOptionProps {
  mapStyle: MapStyle;
  setMapStyle: Function;
}

const DropdownOption = (props: DropdownOptionProps) => {
  return (
    <li 
      role="option"
      className="text-gray-900 cursor-default hover:bg-indigo-500 hover:text-white select-none relative py-2 pl-3 pr-9"
      onClick={() => {
        props.setMapStyle(props.mapStyle);
      }}
    >
      <div className="flex items-center">
        <span className="ml-3 block font-normal truncate">
          {props.mapStyle.title}
        </span>
      </div>
    </li>
  )
};

export default DropdownOption;
