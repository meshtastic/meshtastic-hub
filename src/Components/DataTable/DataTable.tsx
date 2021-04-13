import React, { useState } from 'react';

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
  const [sortBy, setSortBy] = useState<'Name' | 'Mac' | 'Time' | 'Battery'>(
    'Name',
  );
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DEC'>('ASC');

  // useEffect(() => {
  //   setSortedData(props.nodes.sort((a, b) => {
  //     switch (sortBy) {
  //         return (a.user.longName.toUpperCase() < b.user.longName.toUpperCase()) ? -1 : (a.user.longName.toUpperCase() > b.user.longName.toUpperCase()) ? 1 : 0;

  //         break;

  //       default:
  //         break;
  //     }
  //   }))
  // }, [props.nodes, sortBy, sortDirection])
  return (
    <div className="z-10 mx-auto absolute left-0 right-0 bottom-0 w-2/3">
      <div
        className="flex group h-8 bg-gray-200 hover:bg-gray-300 rounded-t-lg cursor-pointer border-b border-gray-300"
        onClick={() => {
          setDataTableOpen(!dataTableOpen);
        }}
      >
        <div className="w-full my-auto mx-4 font-medium">
          <div className="flex justify-between text-gray-600 group-hover:text-gray-700">
            DataTable
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
          <div className="shadow-inner bg-gray-100 h-80 overflow-auto">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className={`px-5 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-medium hover:bg-gray-200 cursor-pointer ${
                      sortBy === 'Name' ? 'bg-gray-200' : null
                    }`}
                    onClick={() => {
                      if (sortBy === 'Name') {
                        sortDirection === 'ASC'
                          ? setSortDirection('DEC')
                          : setSortDirection('ASC');
                      } else {
                        setSortBy('Name');
                        setSortDirection('ASC');
                      }
                    }}
                  >
                    <div className="flex justify-between">
                      Name
                      {sortBy === 'Name' ? (
                        sortDirection === 'ASC' ? (
                          <FaCaretDown className="my-auto text-gray-600" />
                        ) : (
                          <FaCaretUp className="my-auto text-gray-600" />
                        )
                      ) : (
                        <FaSort className="my-auto text-gray-600" />
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className={`px-5 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-medium hover:bg-gray-200 cursor-pointer ${
                      sortBy === 'Mac' ? 'bg-gray-200' : null
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
                          <FaCaretDown className="my-auto text-gray-600" />
                        ) : (
                          <FaCaretUp className="my-auto text-gray-600" />
                        )
                      ) : (
                        <FaSort className="my-auto text-gray-600" />
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className={`px-5 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-medium hover:bg-gray-200 cursor-pointer ${
                      sortBy === 'Time' ? 'bg-gray-200' : null
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
                          <FaCaretDown className="my-auto text-gray-600" />
                        ) : (
                          <FaCaretUp className="my-auto text-gray-600" />
                        )
                      ) : (
                        <FaSort className="my-auto text-gray-600" />
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className={`px-5 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-medium hover:bg-gray-200 cursor-pointer ${
                      sortBy === 'Battery' ? 'bg-gray-200' : null
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
                          <FaCaretDown className="my-auto text-gray-600" />
                        ) : (
                          <FaCaretUp className="my-auto text-gray-600" />
                        )
                      ) : (
                        <FaSort className="my-auto text-gray-600" />
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {props.nodes.map((node, index) => (
                  <TableEntry key={index} node={node} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex shadow-inner bg-gray-100 h-80 overflow-auto text-gray-600">
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
