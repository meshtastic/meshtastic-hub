import React, { useEffect, useState } from 'react';

import DataTable from './Components/DataTable/DataTable';
import Map from './Components/Map';
import {
  getDefaultMapStyle,
  MapStyle,
  MapStyles,
} from './Components/Sidebar/MapStyleSelect';
import {
  getNodes, pollGetNodes
} from './Service/hubMeshtastic';
import Sidebar, { NodeDataProperties } from './Components/Sidebar/Sidebar';
import { currentBrowserLocation } from './Service/geoLocation';
import geoDefaults from './Service/geoLocation/defaults';

export interface position {
  lat: number;
  lng: number;
}

function App () {
  const [nodes, setNodes] = useState({} as GeoJSON.FeatureCollection);
  const [currentPosition, setCurrentPosition] = useState<position>(geoDefaults.US);
  const [darkmode, setDarkmode] = useState<boolean>(false);
  const [mapStyle, setMapStyle] = useState<MapStyle>(
    getDefaultMapStyle(darkmode, MapStyles.Light),
  );

  useEffect(() => { pollGetNodes((x) => { setNodes(x); console.log(x)}).subscribe() }, [])

  return (
    <div
      className={`w-screen h-screen select-none max-h-screen flex flex-col ${
        darkmode ? 'dark' : null
      }`}
    >
      <div className="flex relative h-full overflow-hidden">
        <Map
          nodes={nodes}
          darkmode={darkmode}
          setPosition={setCurrentPosition}
          mapStyle={mapStyle}
        />
        <Sidebar
          nodes={
            Object.keys(nodes).length
              ? nodes.features.map((node) => {
                  return node.properties as NodeDataProperties;
                })
              : []
          }
          position={currentPosition}
          darkmode={darkmode}
          setDarkmode={setDarkmode}
          // setDarkmode={(data: any) => {
          //   setDarkmode(data);
          //   setMapStyle(getDefaultMapStyle(data, mapStyle));
          // }}
          setMapStyle={setMapStyle}
          mapStyle={mapStyle}
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
