import React from 'react';

// import { Client } from '@jdiamond/mqtt-browser';

export interface MQTTProps {}

const MQTT = (props: MQTTProps) => {
  //   const [client, setClient] = useState<Client>({} as Client);
  //   const [packets, setPackets] = useState<Packet[]>([]);

  //   useEffect(() => {
  //     setClient(new Client({ url: 'https://mqtt.meshtastic.org' }));
  //     client.connect().then(() => {
  //       client.subscribe('msh').then(() => {
  //         client.on('message', (topic: any, payload: any) => {
  //           console.log(topic);
  //           console.log(payload);
  //         });
  //       });
  //     });
  //   }, []);

  return (
    <div className="mx-2 mb-2 shadow-md w-md rounded-md border">
      <p>MQTT Chat</p>
    </div>
  );
};

export default MQTT;
