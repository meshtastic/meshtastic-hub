import React from 'react';

import { FaMicrochip } from 'react-icons/fa';

import Badge from '../Generic/Badge';
import type { NodeDataProperties } from '../Sidebar/Node';

export interface TableEntryProps {
  node: NodeDataProperties;
}

const TableEntry = (props: TableEntryProps) => {
  return (
    <tr>
      <td className="px-5 py-1 border-b border-gray-200 text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <FaMicrochip className="mx-auto" />
          </div>
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">
              {props.node.user.longName}
            </p>
          </div>
        </div>
      </td>
      <td className="px-5 py-1 border-b border-gray-200 text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {props.node.user.macaddr}
        </p>
      </td>
      <td className="px-5 py-1 border-b border-gray-200 text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {new Date(props.node.position.time).toISOString()}
        </p>
      </td>
      <td className="px-5 py-1 border-b border-gray-200 text-sm">
        <Badge
          message={`${props.node.position.batteryLevel}%`}
          variant="Success"
        />
      </td>
    </tr>
  );
};

export default TableEntry;
