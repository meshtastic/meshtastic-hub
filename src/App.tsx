import React from 'react';

import DataTable, {
  NodeDataProperties,
} from './Components/DataTable/DataTable';
import Map from './Components/Map';
import {
  getDefaultMapStyle,
  MapStyle,
  MapStyles,
} from './Components/Sidebar/MapStyleSelector';
import Sidebar from './Components/Sidebar/Sidebar';

export interface position {
  lat: number;
  lng: number;
}

function App() {
  const [nodes, setNodes] = React.useState({} as GeoJSON.FeatureCollection);
  const [currentPosition, setCurrentPosition] = React.useState<position>({
    lat: 0,
    lng: 0,
  });
  const [darkmode, setDarkmode] = React.useState<boolean>(false);
  const [mapStyle, setMapStyle] = React.useState<MapStyle>(
    getDefaultMapStyle(darkmode, MapStyles.Light),
  );
  React.useEffect(() => {
    setMapStyle(getDefaultMapStyle(darkmode, mapStyle));
  }, [darkmode]);

  React.useEffect(() => {
    fetch('https://hub.meshtastic.org/v1/geoJSON/nodes')
      .then((response) => response.json())
      .then((data) => {
        setNodes(data);
      })
      .then(() => {
        setInterval(async () => {
          fetch('https://hub.meshtastic.org/v1/geoJSON/nodes')
            .then((response) => response.json())
            .then((data) => {
              setNodes(data);
            });
        }, 20000);
      });
  }, []);
  return (
    <div
      className={`w-screen h-screen select-none max-h-screen flex flex-col ${
        darkmode ? 'dark' : null
      }`}
    >
      <div className="flex flex-col md:flex-row relative h-full overflow-hidden">
        <div className="flex flex-col relative h-full overflow-hidden">
          <Map
            nodes={nodes}
            darkmode={darkmode}
            setPosition={setCurrentPosition}
            position={currentPosition}
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
            setPosition={setCurrentPosition}
          />
        </div>
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
          setMapStyle={setMapStyle}
          mapStyle={mapStyle}
        />
      </div>
    </div>
  );
}

export default App;
