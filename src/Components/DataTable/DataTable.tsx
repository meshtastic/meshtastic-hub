import React, { useEffect, useState } from 'react';

import { FaCaretDown, FaCaretUp, FaSort, FaSpinner } from 'react-icons/fa';

import type { NodeDataProperties } from '../Sidebar/Node';
import TableEntry from './TableEntry';

export interface DataTableProps {
  nodes: NodeDataProperties[];
  loading: boolean;
}

const DataTable = (props: DataTableProps) => {
  const [dataTableOpen, setDataTableOpen] = useState<boolean>(false);
  const [sortedData, setSortedData] = useState<NodeDataProperties[]>([]);
  const [sortBy, setSortBy] = useState<'Id' | 'Mac' | 'Time' | 'Battery'>('Id');
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DEC'>('ASC');

  useEffect(() => {
    setSortedData(props.nodes);
    setSortedData(
      props.nodes.sort((a, b) => {
        if (!props.loading) {
          switch (sortBy) {
            case 'Id':
              if (!a.user?.id) {
                return sortDirection === 'ASC' ? 1 : -1;
              } else if (!b.user?.id) {
                return sortDirection === 'ASC' ? -1 : 1;
              }
              return a.user?.id.toUpperCase() < b.user?.id.toUpperCase()
                ? sortDirection === 'ASC'
                  ? -1
                  : 1
                : a.user?.id.toUpperCase() > b.user?.id.toUpperCase()
                ? sortDirection === 'ASC'
                  ? 1
                  : -1
                : 0;
              break;

            case 'Mac':
              if (!a.user?.macaddr) {
                return sortDirection === 'ASC' ? 1 : 0;
              } else if (!b.user?.macaddr) {
                return sortDirection === 'ASC' ? 0 : 1;
              }
              return a.user.macaddr.toUpperCase() < b.user.macaddr.toUpperCase()
                ? sortDirection === 'ASC'
                  ? -1
                  : 1
                : a.user.macaddr.toUpperCase() > b.user?.macaddr.toUpperCase()
                ? sortDirection === 'ASC'
                  ? 1
                  : -1
                : 0;
              break;

            case 'Time':
              if (!a.position?.time) {
                return sortDirection === 'ASC' ? 1 : 0;
              } else if (!b.position?.time) {
                return sortDirection === 'ASC' ? 0 : 1;
              }
              return a.position.time < b.position.time
                ? sortDirection === 'ASC'
                  ? -1
                  : 1
                : a.position.time > b.position?.time
                ? sortDirection === 'ASC'
                  ? 1
                  : -1
                : 0;
              break;

            case 'Battery':
              if (!a.position?.batteryLevel) {
                return sortDirection === 'ASC' ? 1 : 0;
              } else if (!b.position?.batteryLevel) {
                return sortDirection === 'ASC' ? 0 : 1;
              }
              return a.position.batteryLevel < b.position.batteryLevel
                ? sortDirection === 'ASC'
                  ? -1
                  : 1
                : a.position.batteryLevel > b.position?.batteryLevel
                ? sortDirection === 'ASC'
                  ? 1
                  : -1
                : 0;
              break;

            default:
              return 0;
              break;
          }
        } else {
          return 0;
        }
      }),
    );
  }, [props.nodes, sortBy, sortDirection]);
  return (
    <div className="z-10 mx-auto absolute left-0 right-0 bottom-0 w-2/3">
      <div
        className="flex group h-8 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-800 border-gray-300 dark:border-gray-800 rounded-t-md cursor-pointer border-b "
        onClick={() => {
          setDataTableOpen(!dataTableOpen);
        }}
      >
        <div className="w-full my-auto mx-4 font-medium">
          <div className="text-gray-600 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-200  flex justify-between">
            <div className="flex">
              Nodes:
              <div className="bg-gray-400 dark:bg-gray-900 ml-2 px-2 rounded-full">
                {props.nodes.length}
              </div>
            </div>
            {dataTableOpen ? (
              <FaCaretDown className="my-auto" />
            ) : (
              <FaCaretUp className="my-auto" />
            )}
          </div>
        </div>
      </div>
      {dataTableOpen ? (
        !props.loading ? (
          <div className="bg-gray-100 dark:bg-gray-600 shadow-inner h-80 overflow-auto">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className={`border-gray-200 dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-300 px-5 border-b text-left text-sm uppercase font-medium cursor-pointer ${
                      sortBy === 'Id' ? 'bg-gray-200 dark:bg-gray-700' : null
                    }`}
                    onClick={() => {
                      if (sortBy === 'Id') {
                        sortDirection === 'ASC'
                          ? setSortDirection('DEC')
                          : setSortDirection('ASC');
                      } else {
                        setSortBy('Id');
                        setSortDirection('ASC');
                      }
                    }}
                  >
                    <div className="flex justify-between">
                      ID
                      {sortBy === 'Id' ? (
                        sortDirection === 'ASC' ? (
                          <FaCaretDown className="my-auto text-gray-600 dark:text-gray-100" />
                        ) : (
                          <FaCaretUp className="my-auto text-gray-600 dark:text-gray-100" />
                        )
                      ) : (
                        <FaSort className="my-auto text-gray-600 dark:text-gray-100" />
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className={`border-gray-200 dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-300 px-5 border-b text-left text-sm uppercase font-medium cursor-pointer ${
                      sortBy === 'Mac' ? 'bg-gray-200 dark:bg-gray-700' : null
                    }`}
                    onClick={() => {
                      if (sortBy === 'Mac') {
                        sortDirection === 'ASC'
                          ? setSortDirection('DEC')
                          : setSortDirection('ASC');
                      } else {
                        setSortBy('Mac');
                        setSortDirection('ASC');
                      }
                    }}
                  >
                    <div className="flex justify-between">
                      MAC
                      {sortBy === 'Mac' ? (
                        sortDirection === 'ASC' ? (
                          <FaCaretDown className="my-auto text-gray-600 dark:text-gray-100" />
                        ) : (
                          <FaCaretUp className="my-auto text-gray-600 dark:text-gray-100" />
                        )
                      ) : (
                        <FaSort className="my-auto text-gray-600 dark:text-gray-100" />
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className={`border-gray-200 dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-300 px-5 border-b text-left text-sm uppercase font-medium cursor-pointer ${
                      sortBy === 'Time' ? 'bg-gray-200 dark:bg-gray-700' : null
                    }`}
                    onClick={() => {
                      if (sortBy === 'Time') {
                        sortDirection === 'ASC'
                          ? setSortDirection('DEC')
                          : setSortDirection('ASC');
                      } else {
                        setSortBy('Time');
                        setSortDirection('ASC');
                      }
                    }}
                  >
                    <div className="flex justify-between">
                      Time
                      {sortBy === 'Time' ? (
                        sortDirection === 'ASC' ? (
                          <FaCaretDown className="my-auto text-gray-600 dark:text-gray-100" />
                        ) : (
                          <FaCaretUp className="my-auto text-gray-600 dark:text-gray-100" />
                        )
                      ) : (
                        <FaSort className="my-auto text-gray-600 dark:text-gray-100" />
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className={`border-gray-200 dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-300 px-5 border-b text-left text-sm uppercase font-medium cursor-pointer ${
                      sortBy === 'Battery'
                        ? 'bg-gray-200 dark:bg-gray-700'
                        : null
                    }`}
                    onClick={() => {
                      if (sortBy === 'Battery') {
                        sortDirection === 'ASC'
                          ? setSortDirection('DEC')
                          : setSortDirection('ASC');
                      } else {
                        setSortBy('Battery');
                        setSortDirection('ASC');
                      }
                    }}
                  >
                    <div className="flex justify-between">
                      Battery
                      {sortBy === 'Battery' ? (
                        sortDirection === 'ASC' ? (
                          <FaCaretDown className="my-auto text-gray-600 dark:text-gray-100" />
                        ) : (
                          <FaCaretUp className="my-auto text-gray-600 dark:text-gray-100" />
                        )
                      ) : (
                        <FaSort className="my-auto text-gray-600 dark:text-gray-100" />
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((node, index) => (
                  <TableEntry key={index} node={node} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-gray-100 dark:bg-gray-600 text-gray-600 flex shadow-inner h-80 overflow-auto">
            <div className="flex m-auto">
              <div className="text-2xl font-medium mr-2">Loading</div>
              <FaSpinner className="animate-spin m-auto text-2xl" />
            </div>
          </div>
        )
      ) : null}
    </div>
  );
};

export default DataTable;
