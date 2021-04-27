import React, { useState } from 'react';

import { ChatAltIcon } from '@heroicons/react/outline';
import { Client } from '@jdiamond/mqtt-browser';

export interface MQTTProps {}

const MQTT = (props: MQTTProps) => {
  const [packets, setPackets] = useState<
    {
      node: string;
      packetType: 'TEXT_MESSAGE_APP' | 'NODEINFO_APP' | 'POSITION_APP';
      data: Object;
    }[]
  >([]);
  const mqtt = async () => {
    const client = new Client({
      url: 'ws://mqtt.meshtastic.org:9001',
      logger: console.log,
    });
    client.connect();
    // await client.subscribe('msh/1/json/#');
    await client.subscribe('msh/1/json/LongSlow/#');
    client.on('message', (topic: string, payload: any) => {
      let data = topic.replace('msh/1/json/LongSlow/', '').split('/');
      const textdec = new TextDecoder();
      setPackets((existing_packets) => [
        ...existing_packets,
        {
          node: data[0],
          packetType: data[1] as
            | 'TEXT_MESSAGE_APP'
            | 'NODEINFO_APP'
            | 'POSITION_APP',
          data: JSON.parse(textdec.decode(payload)),
        },
      ]);
    });
    console.log(client);
  };

  React.useEffect(() => {
    mqtt();
  }, []);

  return (
    <div className="flex bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-100 shadow-md border rounded-md">
      <div className="px-2 space-y-2 mb-2 my-auto w-full">
        <div className="flex border-b h-10">
          <ChatAltIcon className="w-5 h-5 mr-2 my-auto" />
          <div className="text-lg my-auto">MQTT Messages</div>
        </div>
        {packets.find((packet) => packet.packetType === 'TEXT_MESSAGE_APP') ? (
          packets
            .filter((packet) => packet.packetType === 'TEXT_MESSAGE_APP')
            .map((packet, index) => (
              <div
                key={index}
                className="flex px-2 justify-between h-6 bg-gray-200 rounded-md"
              >
                <div>{packet.node}</div>
                <div className="text-sm">{packet.data.packet.decoded}</div>
              </div>
            ))
        ) : (
          <>
            <div className="animate-pulse h-6 bg-gray-200 rounded-md"></div>
            <div className="animate-pulse h-6 bg-gray-200 rounded-md"></div>
            <div className="animate-pulse h-6 bg-gray-200 rounded-md"></div>
            <div className="animate-pulse h-6 bg-gray-200 rounded-md"></div>
            <div className="animate-pulse h-6 bg-gray-200 rounded-md"></div>
          </>
        )}
      </div>
    </div>
  );
};

export default MQTT;
