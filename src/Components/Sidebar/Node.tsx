import React, { useState } from 'react';

import { FaCaretDown, FaCaretUp } from 'react-icons/fa';

export interface NodeProps {
  node: NodeDataProperties;
}

export interface NodeDataProperties {
  id: string;
  lastHeard: number;
  longName: string;
  position: {
    altitude: number;
    batteryLevel: number;
    latitudeI: number;
    longitudeI: number;
    time: number;
  };
  user: {
    hwModel: string; //enum
    id: string;
    longName: string;
    macaddr: string;
    shortName: string;
  };
}

const Node = (props: NodeProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <div className="flex flex-col" key={props.node?.id}>
      <div
        className="flex justify-between cursor-pointer border-b hover:bg-gray-200 p-2"
        onClick={() => {
          setDropdownOpen(!dropdownOpen);
        }}
      >
        <div className="flex">
          <div className="flex my-auto rounded-full w-8 h-8 bg-green-500 mr-2">
            <p className="m-auto">?</p>
          </div>
          <p className="truncate">{props.node.longName}</p>
        </div>
        <div className="my-auto">
          {/* hover:bounce */}
          {dropdownOpen ? <FaCaretUp /> : <FaCaretDown />}
        </div>
      </div>

      {dropdownOpen ? (
        <div className="border-b p-2">{props.node.user.hwModel}</div>
      ) : null}
    </div>
  );
};

export default Node;
