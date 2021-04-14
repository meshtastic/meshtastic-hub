import React, { useState } from 'react';

import { FaMapMarkedAlt, FaSort } from 'react-icons/fa';

export interface DropdownProps {
  // options:
}

const Dropdown = () => {
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
          <FaMapMarkedAlt className="text-gray-600" />
          <span className="ml-3 block truncate">Satellite</span>
        </span>
        <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <FaSort className="text-gray-600 text-sm" />
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
            <li
              id="listbox-item-0"
              role="option"
              className="text-gray-900 cursor-default hover:bg-indigo-500 hover:text-white select-none relative py-2 pl-3 pr-9"
            >
              <div className="flex items-center">
                <img
                  src="/images/person/1.jpg"
                  alt="person"
                  className="flex-shrink-0 h-6 w-6 rounded-full"
                />
                <span className="ml-3 block font-normal truncate">
                  Mick Poulaz
                </span>
              </div>
              <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </span>
            </li>
            <li
              id="listbox-item-1"
              role="option"
              className="text-gray-900 cursor-default select-none hover:bg-indigo-500 hover:text-white relative py-2 pl-3 pr-9"
            >
              <div className="flex items-center">
                <img
                  src="/images/person/1.jpg"
                  alt="person"
                  className="flex-shrink-0 h-6 w-6 rounded-full"
                />
                <span className="ml-3 block font-normal truncate">
                  Julien Schiano
                </span>
              </div>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default Dropdown;
