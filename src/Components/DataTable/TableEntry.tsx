import React, { Dispatch, SetStateAction } from 'react';

import { ChipIcon } from '@heroicons/react/outline';

import Badge from '../Generic/Badge';
import type { NodeDataProperties } from '../Sidebar/Sidebar';

export interface TableEntryProps {
  node: NodeDataProperties;
  selected: boolean;
  setSelectedNode: Dispatch<SetStateAction<NodeDataProperties | undefined>>;
}

const TableEntry = (props: TableEntryProps) => {
  const decodeMac = (mac: string) => {
    let decodedMac = '';

    for (let i = 0; i < mac.length; i++) {
      decodedMac += (':' + mac.charCodeAt(i).toString(16)).slice(-4);
    }

    return decodedMac.slice(1);
  };
  return (
    <tr
      className={`bg-gray-100 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-800 cursor-pointer border-b ${
        props.selected ? 'bg-gray-200 dark:bg-gray-700' : null
      }`}
      onClick={() => {
        props.setSelectedNode(props.node);
      }}
    >
      <td className="text-gray-900 dark:text-gray-200 sm:px-1 md:px-5 py-1 text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <ChipIcon className="w-5 h-5" />
          </div>
          <div className="ml-3">
            {props.node.user?.id ? (
              <p className="whitespace-no-wrap">{props.node.user.id}</p>
            ) : (
              <Badge message="Unknown" variant="Neutral" />
            )}
          </div>
        </div>
      </td>
      <td className="text-gray-900 dark:text-gray-200 sm:px-1 md:px-5 py-1 text-sm">
        {props.node.user?.macaddr ? (
          <p className="whitespace-no-wrap">
            {decodeMac(props.node.user.macaddr)}
          </p>
        ) : (
          <Badge message="Unknown" variant="Neutral" />
        )}
      </td>
      <td className="text-gray-900 dark:text-gray-200 sm:px-1 md:px-5 py-1 text-sm">
        {props.node.position?.time ? (
          <p className="whitespace-no-wrap">
            {new Date(props.node.position.time * 1000).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        ) : (
          <Badge message="Unknown" variant="Neutral" />
        )}
      </td>
      <td className="text-gray-900 dark:text-gray-200 sm:px-1 md:px-5 py-1 text-sm">
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
          <Badge message="Unknown" variant="Neutral" />
        )}
      </td>
    </tr>
  );
};

export default TableEntry;
