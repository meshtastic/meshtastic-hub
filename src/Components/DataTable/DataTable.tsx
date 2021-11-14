import React from 'react';

import { Column, useSortBy, useTable } from 'react-table';

import { Disclosure } from '@headlessui/react';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  SortAscendingIcon,
  SortDescendingIcon,
} from '@heroicons/react/outline';

import type { position } from '../../App';
import Badge from '../Generic/Badge';
import NodeView from './NodeView';

export interface NodeDataProperties {
  id: string;
  lastHeard?: number;
  longName?: string;
  position?: {
    altitude?: number;
    batteryLevel?: number;
    latitudeI?: number;
    longitudeI?: number;
    time?: number;
  };
  user?: {
    hwModel?: string; //enum
    id?: string;
    longName?: string;
    macaddr?: string;
    shortName?: string;
  };
}

export interface DataTableProps {
  nodes: NodeDataProperties[];
  loading: boolean;
  setPosition: React.Dispatch<React.SetStateAction<position>>;
}
export const DataTable = (props: DataTableProps) => {
  const [selectedNode, setSelectedNode] = React.useState<
    NodeDataProperties | undefined
  >();
  const decodeMac = (mac: string) => {
    let decodedMac = '';

    for (let i = 0; i < mac.length; i++) {
      decodedMac += (':' + mac.charCodeAt(i).toString(16)).slice(-4);
    }

    return decodedMac.slice(1);
  };
  const columns = React.useMemo<Column<typeof data[0]>[]>(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'MAC',
        accessor: 'mac',
      },
      {
        Header: 'Time',
        accessor: 'time',
      },
      {
        Header: 'Battery',
        accessor: 'battery',
      },
    ],
    [],
  );
  const data = React.useMemo(
    () =>
      props.nodes.length
        ? props.nodes.map((node) => {
            return {
              id: node.user?.id ? (
                node.user.id
              ) : (
                <Badge message="N/A" variant="Neutral" />
              ),
              mac: node.user?.macaddr ? (
                decodeMac(node.user.macaddr)
              ) : (
                <Badge message="N/A" variant="Neutral" />
              ),
              time: node.position?.time ? (
                new Date(node.position.time * 1000).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              ) : (
                <Badge message="N/A" variant="Neutral" />
              ),
              battery: node.position?.batteryLevel ? (
                node.position.batteryLevel < 33 ? (
                  <Badge
                    message={`${node.position.batteryLevel}%`}
                    variant="Danger"
                  />
                ) : node.position < 66 ? (
                  <Badge
                    message={`${node.position.batteryLevel}%`}
                    variant="Warning"
                  />
                ) : (
                  <Badge
                    message={`${node.position.batteryLevel}%`}
                    variant="Success"
                  />
                )
              ) : (
                <Badge message="N/A" variant="Neutral" />
              ),
            };
          })
        : [],
    [props.nodes],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy,
    );

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="z-50 w-full bg-white border-b border-gray-300 cursor-pointer focus:outline-none group dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 dark:border-gray-800">
            <div className="flex w-full h-8 font-medium">
              <div className="flex justify-between w-full mx-4 my-auto text-gray-600 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-200">
                <div className="flex">
                  Nodes:
                  <div className="px-2 ml-2 bg-gray-200 border rounded-full dark:bg-gray-800 group-hover:bg-gray-300 dark:group-hover:bg-gray-900">
                    {props.nodes.length}
                  </div>
                </div>
                <div className="flex group">
                  {open ? (
                    <ChevronDownIcon className="w-5 h-5 my-auto group-hover:animate-bounce" />
                  ) : (
                    <ChevronUpIcon className="w-5 h-5 my-auto group-hover:animate-bounce" />
                  )}
                </div>
              </div>
            </div>
          </Disclosure.Button>
          <Disclosure.Panel className="z-50 flex flex-col text-gray-500 md:flex-row">
            <div className="w-full overflow-auto bg-white shadow-inner dark:bg-gray-600 h-80">
              <table {...getTableProps()} className="min-w-full leading-normal">
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps(),
                          )}
                          className={`hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-300 bg-white dark:bg-gray-600 border-gray-200 dark:border-gray-700 border-b z-40 sticky top-0 px-2 md:px-5  text-left text-sm uppercase font-medium cursor-pointer ${
                            column.isSorted
                              ? 'bg-gray-100 dark:bg-gray-700'
                              : null
                          }`}
                        >
                          <div className="flex justify-between text-gray-600 dark:text-gray-100">
                            {column.render('Header')}
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <SortAscendingIcon className="w-4 h-4 my-auto" />
                              ) : (
                                <SortDescendingIcon className="w-4 h-4 my-auto" />
                              )
                            ) : (
                              <SortDescendingIcon className="w-4 h-4 my-auto" />
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row) => {
                    prepareRow(row);
                    return (
                      <tr
                        {...row.getRowProps()}
                        className={`bg-white dark:bg-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-800 cursor-pointer border-b ${
                          selectedNode?.id ===
                          row.cells.find((cell) => cell.column.id === 'id')
                            ?.value
                            ? 'bg-gray-100 dark:bg-gray-700'
                            : null
                        }`}
                        onClick={() => {
                          props.nodes.find(
                            (node) => node.id === selectedNode?.id,
                          )
                            ? setSelectedNode(undefined)
                            : setSelectedNode(
                                props.nodes.find(
                                  (node) =>
                                    node.id ===
                                    row.cells.find(
                                      (cell) => cell.column.id === 'id',
                                    )?.value,
                                ),
                              );
                        }}
                      >
                        {row.cells.map((cell) => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className="px-2 py-1 text-sm text-gray-900 dark:text-gray-200 md:px-5"
                            >
                              {cell.render('Cell')}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex w-full bg-white dark:bg-gray-600 md:w-1/3">
              {selectedNode ? (
                <NodeView node={selectedNode} setPosition={props.setPosition} />
              ) : (
                <div className="m-auto font-medium">No node selected.</div>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
