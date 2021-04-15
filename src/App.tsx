import React, { useEffect, useState } from 'react';

import DataTable from './Components/DataTable/DataTable';
import Map from './Components/Map';
import type { NodeDataProperties } from './Components/Sidebar/Node';
import Sidebar from './Components/Sidebar/Sidebar';

function App() {
  const [nodes, setNodes] = useState({} as GeoJSON.FeatureCollection);
  const [currentPosition, setCurrentPosition] = useState<{
    lat: number;
    lng: number;
  }>({
    lat: 0,
    lng: 0,
  });
  const [darkmode, setDarkmode] = useState<boolean>(false);

  useEffect(() => {
    setInterval(async () => {
      fetch('https://hub.meshtastic.org/v1/geoJSON/nodes')
        .then((response) => response.json())
        .then((data) => {
          setNodes(data);
        });
    }, 3000);
  }, []);
  return (
    <div
      className={`w-screen h-screen max-h-screen flex flex-col ${
        darkmode ? 'dark' : null
      }`}
    >
      <div className="flex relative h-full overflow-hidden">
        <Map
          nodes={nodes}
          darkmode={darkmode}
          setPosition={(data) => {
            setCurrentPosition(data);
          }}
        />
        <Sidebar
          nodes={
            Object.keys(nodes).length
              ? nodes.features.map((node) => {
                  return node.properties as NodeDataProperties;
                })
              : []
          }
          currentPosition={currentPosition}
          darkmode={darkmode}
          setDarkmode={(data: any) => {
            setDarkmode(data);
          }}
        />
        <DataTable
          nodes={
            Object.keys(nodes).length
              ? nodes.features.map((node) => {
                  return node.properties as NodeDataProperties;
                })
              : []
          }
          loading={!Object.keys(nodes).length}
        />
      </div>
    </div>
  );
}

export default App;
