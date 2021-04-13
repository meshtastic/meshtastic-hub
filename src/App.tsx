import React, { useEffect, useState } from 'react';

import DataTable from './Components/DataTable/DataTable';
import Map from './Components/Map';
import type { NodeDataProperties } from './Components/Sidebar/Node';
import Sidebar from './Components/Sidebar/Sidebar';

function App() {
  let [nodes, setNodes] = useState({} as GeoJSON.FeatureCollection);

  useEffect(() => {
    setInterval(async () => {
      fetch('http://hub.meshtastic.org/v1/geoJSON/nodes')
        .then((response) => response.json())
        .then((data) => {
          setNodes(data);
        });
    }, 3000);
  }, []);
  return (
    <div className="w-screen h-screen max-h-screen flex flex-col">
      <div className="flex relative h-full overflow-hidden">
        <Map nodes={nodes} />
        <Sidebar
          nodes={
            Object.keys(nodes).length
              ? nodes.features.map((node) => {
                  return node.properties as NodeDataProperties;
                })
              : []
          }
        />
        <DataTable
          nodes={
            Object.keys(nodes).length
              ? nodes.features.map((node) => {
                  return node.properties as NodeDataProperties;
                })
              : []
          }
        />
      </div>
    </div>
  );
}

export default App;
