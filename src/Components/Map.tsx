import 'mapbox-gl/dist/mapbox-gl.css';

import React, { useLayoutEffect, useRef } from 'react';

import type { position } from 'src/App';

import { getDefaultMapStyle, MapStyle } from './Sidebar/MapStyleSelect';
import geoDefaults from '../Service/geoLocation/defaults';
import { MapClass } from '../Models/Map';


const MAP_ROOT_ID = 'MAP_ROOT'
export interface MapProps {
  nodes: GeoJSON.FeatureCollection;
  darkmode: boolean;
  mapStyle: MapStyle;
  setPosition: React.Dispatch<React.SetStateAction<position>>;
}
const Map = (props: MapProps) => {
  useLayoutEffect(() => {
    new MapClass({
      view: {
        coords: [geoDefaults.US.lat, geoDefaults.US.lng],
        zoom: geoDefaults.US.zoom
      },
      DOM: {
        containerId: MAP_ROOT_ID,
        style: getDefaultMapStyle(props.darkmode, props.mapStyle).url
      }
    })
  }, [])

  // useEffect(() => {
  //   if (mapLoaded && map) {
  //     const source = map.getSource('nodes');
  //     if (!source && props.nodes.type) {
  //       map.addSource('nodes', {
  //         type: 'geojson',
  //         data: props.nodes,
  //       });

  //       map.addLayer({
  //         id: 'points',
  //         type: 'symbol',
  //         source: 'nodes',

  //         layout: {
  //           'icon-image': 'custom-marker',
  //           'text-field': ['get', 'title'],
  //           'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
  //           'text-offset': [0, 1.25],
  //           'text-anchor': 'top',
  //         },
  //       });
  //     } else {
  //       if (source.type === 'geojson') {
  //         source.setData(props.nodes);
  //       }
  //     }
  //   }
  // }, [props.nodes]);

  // useLayoutEffect(() => {
  //   const attachMap = (
  //     setMap: React.Dispatch<React.SetStateAction<any>>,
  //     mapDiv: React.RefObject<HTMLDivElement>,
  //   ) => {
  //     const map = new mapboxgl.Map({
  //       container: mapDiv.current || '',
  //       style: getDefaultMapStyle(props.darkmode, props.mapStyle).url,
  //       center: [coords.lat, coords.lng],
  //       zoom: zoom,
  //     });
  //     setMap(map);

  //     map.on('move', () => {
  //       const currentLat = map.getCenter().lat;
  //       const currentLng = map.getCenter().lng;
  //       setCoords({lat:currentLat, lng:currentLng})
  //       setZoom(parseFloat(map.getZoom().toPrecision(4)));
  //       props.setPosition({
  //         lat: currentLat,
  //         lng: currentLng,
  //       });
  //     });
  //   };

  //   !map && attachMap(setMap, mapDiv);
  // }, [map]);

  return <div className="w-screen h-screen flex-grow" id={ MAP_ROOT_ID } />;
};

export default Map;
