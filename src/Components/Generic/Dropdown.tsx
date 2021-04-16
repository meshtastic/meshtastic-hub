import React, { useState } from 'react';

import { FaMapMarkedAlt, FaSort } from 'react-icons/fa';

import { MapStyle, MapStyles } from '../../MapStyle';
import DropdownOption from './DropdownOption';

export interface DropdownProps {
  mapStyle: MapStyle;
  setMapStyle: Function;
}

const Dropdown = (props: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="px-2 pb-2 relative">
      <button
        type="button"
        className="relative w-full rounded-md border shadow-md p-1 text-left cursor-default focus:outline-none"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <span className="flex items-center">
          {/* <img
            src="/images/person/2.jpeg"
            alt="person"
            className="flex-shrink-0 h-6 w-6 rounded-full"
          /> */}
          <FaMapMarkedAlt className="text-gray-600 dark:text-gray-200" />
          <span className="ml-3 block truncate dark:text-gray-200">{props.mapStyle.title}</span>
        </span>
        <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <FaSort className="text-sm text-gray-600 dark:text-gray-200" />
        </span>
      </button>
      {isOpen ? (
        <div className="absolute mt-1 w-full z-10 rounded-md bg-white shadow-md">
          <ul
            tabIndex={-1}
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-item-3"
            className="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
          >
            {Object.entries(MapStyles).map(([_, mapStyle], index) => (
                <DropdownOption
                  key={index}
                  mapStyle={mapStyle}
                  setMapStyle={(data: MapStyle) => {
                    props.setMapStyle(data);
                    setIsOpen(!isOpen);
                  }} 
                />
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default Dropdown;
