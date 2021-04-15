import React, { useEffect, useState } from 'react';

import { FaMoon, FaSun } from 'react-icons/fa';

export interface DarkmodeToggleProps {
  darkmode: boolean;
  toggle?: Function;
}

const DarkmodeToggle = (props: DarkmodeToggleProps) => {
  const [darkmode, setDarkmode] = useState(false);

  useEffect(() => {
    setDarkmode(props.darkmode);
  }, []);

  return (
    <div
      onClick={() => {
        setDarkmode(!darkmode);
        console.log('clicked');

        if (props.toggle) {
          props.toggle();
        }
      }}
      className={`bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-100 cursor-pointer shadow-md w-36 h-10 flex items-center rounded-full p-1 duration-300 ease-in-out my-auto`}
    >
      <div
        className={`bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 flex h-8 rounded-full shadow-md transform duration-300 ease-in-out ${
          darkmode ? 'translate-x-14' : null
        }`}
      >
        <div className="flex m-auto px-2">
          {darkmode ? (
            <>
              <FaMoon className="m-auto mr-1" />
              Dark
            </>
          ) : (
            <>
              <FaSun className="m-auto mr-1" />
              Light
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DarkmodeToggle;
