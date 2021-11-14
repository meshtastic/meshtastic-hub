import type React from 'react';

import {
  ChatAltIcon,
  ClockIcon,
  LightningBoltIcon,
  LocationMarkerIcon,
} from '@heroicons/react/outline';

import type { position } from '../../App';
import type { NodeDataProperties } from '../DataTable/DataTable';
import Badge from '../Generic/Badge';

export interface NodeViewProps {
  node: NodeDataProperties;
  setPosition: React.Dispatch<React.SetStateAction<position>>;
}

const NodeView = (props: NodeViewProps) => {
  return (
    <div className="w-full font-medium">
      <div className="flex h-10 border-b ">
        <div className="flex justify-between w-full mx-2 my-auto">
          <div className="">
            Node: <Badge variant={'Neutral'} message={props.node.id} />
          </div>
          <div className="flex space-x-2">
            <div className="flex cursor-pointer group">
              <ClockIcon className="w-5 h-5 my-auto mr-1 group-hover:text-gray-700" />
              <div className="my-auto text-sm group-hover:text-gray-700">
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
            <div className="flex cursor-pointer group">
              <LightningBoltIcon className="w-5 h-5 my-auto mr-1 group-hover:text-gray-700" />
              <div className="my-auto text-sm group-hover:text-gray-700">
                {props.node.position?.batteryLevel
                  ? `${props.node.position.batteryLevel}%`
                  : 'UNK'}
              </div>
            </div>
            <div
              className="flex cursor-pointer group"
              onClick={() => {
                if (
                  props.node.position?.latitudeI &&
                  props.node.position?.longitudeI
                ) {
                  props.setPosition({
                    lat: props.node.position.latitudeI / 1e7,
                    lng: props.node.position.longitudeI / 1e7,
                  });
                }
              }}
            >
              <LocationMarkerIcon className="w-5 h-5 my-auto mr-1 group-hover:text-gray-700" />
              <div className="my-auto text-sm group-hover:text-gray-700">
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
        <div className="flex p-2">{props.node.user?.hwModel}</div>
        <div className="w-full px-2 my-auto mb-2 space-y-2">
          <div className="flex h-10 border-b">
            <ChatAltIcon className="w-5 h-5 my-auto mr-2" />
            <div className="my-auto text-lg">Messages</div>
          </div>
          <div className="h-6 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default NodeView;
