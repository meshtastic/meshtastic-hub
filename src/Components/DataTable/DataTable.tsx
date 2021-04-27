import React from 'react';

import { Column, useSortBy, useTable } from 'react-table';

import { Disclosure } from '@headlessui/react';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  SortAscendingIcon,
  SortDescendingIcon,
} from '@heroicons/react/outline';

import Badge from '../Generic/Badge';
import type { NodeDataProperties } from '../Sidebar/Sidebar';
import NodeView from './NodeView';
import type { position } from '../../App';

export interface DataTableProps {
  nodes: NodeDataProperties[];
  loading: boolean;
  setPosition: React.Dispatch<React.SetStateAction<position>>;
}
const DataTable = (props: DataTableProps) => {
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
                <Badge message="Unknown" variant="Neutral" />
              ),
              mac: node.user?.macaddr ? (
                decodeMac(node.user.macaddr)
              ) : (
                <Badge message="Unknown" variant="Neutral" />
              ),
              time: node.position?.time ? (
                new Date(node.position.time * 1000).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              ) : (
                <Badge message="Unknown" variant="Neutral" />
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
                <Badge message="Unknown" variant="Neutral" />
              ),
            };
          })
        : [],
    [props.nodes],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
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
          <Disclosure.Button className="z-50 w-full focus:outline-none group bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 border-gray-300 dark:border-gray-800 cursor-pointer border-b">
            <div className="flex h-8 w-full font-medium">
              <div className="flex mx-4 w-full my-auto text-gray-600 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-200 justify-between">
                <div className="flex">
                  Nodes:
                  <div className="bg-gray-200 dark:bg-gray-800 group-hover:bg-gray-300 dark:group-hover:bg-gray-900 border ml-2 px-2 rounded-full">
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
          <Disclosure.Panel className="flex flex-col z-50 md:flex-row text-gray-500">
            <div className="w-full md:w-2/3 bg-white dark:bg-gray-600 shadow-inner h-80 overflow-auto">
              <table {...getTableProps()} className="min-w-full leading-normal">
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps(),
                          )}
                          className={`hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-300 bg-white dark:bg-gray-600 border-gray-200 dark:border-gray-700 border-b z-40 sticky top-0 sm:px-1 md:px-5  text-left text-sm uppercase font-medium cursor-pointer ${
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
                          setSelectedNode(
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
                              className="text-gray-900 dark:text-gray-200 sm:px-1 md:px-5 py-1 text-sm"
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

            <div className="flex bg-white dark:bg-gray-600 w-full md:w-1/3">
              {selectedNode ? (
                <NodeView 
                  node={selectedNode}
                  setPosition={props.setPosition}
                />
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

export default DataTable;
