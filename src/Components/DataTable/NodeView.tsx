import React from 'react';

import {
  ChatAltIcon,
  ClockIcon,
  LightningBoltIcon,
  LocationMarkerIcon,
} from '@heroicons/react/outline';

import Badge from '../Generic/Badge';
import type { NodeDataProperties } from '../Sidebar/Sidebar';

export interface NodeViewProps {
  node: NodeDataProperties;
}

const NodeView = (props: NodeViewProps) => {
  return (
    <div className="font-medium w-full">
      <div className="flex h-10 border-b ">
        <div className="flex w-full my-auto justify-between mx-2">
          <div className="">
            Node: <Badge variant={'Neutral'} message={props.node.id} />
          </div>
          <div className="flex space-x-2">
            <div className="flex group cursor-pointer">
              <ClockIcon className="w-5 h-5 my-auto group-hover:text-gray-700 mr-1" />
              <div className="text-sm my-auto group-hover:text-gray-700">
                {props.node.position?.time
                  ? new Date(
                      props.node.position.time * 1000,
                    ).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : 'UNK'}
              </div>
            </div>
            <div className="flex group cursor-pointer">
              <LightningBoltIcon className="w-5 h-5 my-auto group-hover:text-gray-700 mr-1" />
              <div className="text-sm my-auto group-hover:text-gray-700">
                {props.node.position?.batteryLevel
                  ? `${props.node.position.batteryLevel}%`
                  : 'UNK'}
              </div>
            </div>
            <div className="flex group cursor-pointer">
              <LocationMarkerIcon className="w-5 h-5 my-auto group-hover:text-gray-700 mr-1" />
              <div className="text-sm my-auto group-hover:text-gray-700">
                {props.node.position?.latitudeI &&
                props.node.position?.longitudeI
                  ? `${(props.node.position.latitudeI / 1e7).toFixed(2)}, ${(
                      props.node.position.longitudeI / 1e7
                    ).toFixed(2)}`
                  : 'UNK'}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-2">
        <div className="flex p-2">
          {props.node.user?.hwModel === 'TLORA_V2' ||
          props.node.user?.hwModel === 'TLORA_V1' ||
          props.node.user?.hwModel === 'TLORA_V2_1_1p6' ||
          props.node.user?.hwModel === 'TLORA_V1_1p3' ||
          props.node.user?.hwModel === 'TBEAM' ||
          props.node.user?.hwModel === 'TBEAM0p7' ||
          props.node.user?.hwModel === 'T_ECHO' ? (
            <img src="/LILYGO_logo.svg" className="h-16 text-black" />
          ) : props.node.user?.hwModel === '' ? (
            <img src="/RAKWireless_logo.svg" className="h-16 text-black" />
          ) : props.node.user?.hwModel === '' ? (
            <img src="/RAKWireless_logo.svg" className="h-16 text-black" />
          ) : props.node.user?.hwModel === '' ? (
            <img src="/RAKWireless_logo.svg" className="h-16 text-black" />
          ) : props.node.user?.hwModel === '' ? (
            <img src="/RAKWireless_logo.svg" className="h-16 text-black" />
          ) : props.node.user?.hwModel === '' ? (
            <img src="/RAKWireless_logo.svg" className="h-16 text-black" />
          ) : (
            <img src="/RAKWireless_logo.svg" className="h-16 text-black" />
          )}
        </div>
        <div className="px-2 space-y-2 mb-2 my-auto w-full">
          <div className="flex border-b h-10">
            <ChatAltIcon className="w-5 h-5 mr-2 my-auto" />
            <div className="text-lg my-auto">Messages</div>
          </div>
          <div className="animate-pulse h-6 bg-gray-200 rounded-md"></div>
          <div className="animate-pulse h-6 bg-gray-200 rounded-md"></div>
          <div className="animate-pulse h-6 bg-gray-200 rounded-md"></div>
          <div className="animate-pulse h-6 bg-gray-200 rounded-md"></div>
          <div className="animate-pulse h-6 bg-gray-200 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default NodeView;
