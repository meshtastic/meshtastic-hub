import React, { useState } from 'react';

import { FaMicrochip } from 'react-icons/fa';

import Badge from '../Generic/Badge';
import type { NodeDataProperties } from '../Sidebar/Node';

export interface TableEntryProps {
  node: NodeDataProperties;
}

const TableEntry = (props: TableEntryProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <>
      <tr
        className={`hover:bg-gray-300 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-800 cursor-pointer border-b ${
          expanded ? 'bg-gray-200 dark:bg-gray-700' : null
        }`}
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        <td className=" text-gray-900 dark:text-gray-200 px-5 py-1 text-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FaMicrochip className="mx-auto" />
            </div>
            <div className="ml-3">
              <p className="whitespace-no-wrap">
                {props.node.user?.id ? props.node.user?.id : 'Undefined'}
              </p>
            </div>
          </div>
        </td>
        <td className=" text-gray-900 dark:text-gray-200 px-5 py-1 text-sm">
          <p className="whitespace-no-wrap">
            {props.node.user?.macaddr ? props.node.user.macaddr : 'Undefined'}
          </p>
        </td>
        <td className=" text-gray-900 dark:text-gray-200 px-5 py-1 text-sm">
          <p className="whitespace-no-wrap">
            {props.node.position?.time
              ? new Date(props.node.position.time * 1000).toLocaleTimeString()
              : 'Undefined'}
          </p>
        </td>
        <td className=" text-gray-900 dark:text-gray-200 px-5 py-1 text-sm">
          {props.node.position?.batteryLevel ? (
            props.node.position.batteryLevel < 33 ? (
              <Badge
                message={`${props.node.position.batteryLevel}%`}
                variant="Danger"
              />
            ) : props.node.position < 66 ? (
              <Badge
                message={`${props.node.position.batteryLevel}%`}
                variant="Warning"
              />
            ) : (
              <Badge
                message={`${props.node.position.batteryLevel}%`}
                variant="Success"
              />
            )
          ) : (
            <Badge message="Undefined" variant="Neutral" />
          )}
        </td>
      </tr>
      {expanded ? (
        <td
          className="border-gray-300 dark:border-gray-800 border-b p-0"
          colSpan={4}
        >
          <div className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 flex px-5 shadow-inner w-full space-x-4 py-4">
            <div className="flex">
              <FaMicrochip className="text-8xl m-auto" />
            </div>
            <div className="text-xl font-medium">
              {props.node.user?.longName}
            </div>
          </div>
        </td>
      ) : null}
    </>
  );
};

export default TableEntry;
