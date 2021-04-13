import 'mapbox-gl/dist/mapbox-gl.css';

import React, { useEffect, useRef, useState } from 'react';

import mapboxgl from 'mapbox-gl';

export interface MapProps {
  nodes: GeoJSON.FeatureCollection;
}
const Map = (props: MapProps) => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoic2FjaGF3IiwiYSI6ImNrNW9meXozZjBsdW0zbHBjM2FnNnV6cmsifQ.3E4n8eFGD9ZOFo-XDVeZnQ';
  const mapDiv = useRef<HTMLDivElement>(null);
  let [map, setMap] = useState(null as mapboxgl.Map | null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (mapLoaded && map) {
      const source = map.getSource('nodes');
      if (!source && props.nodes.type) {
        map.addSource('nodes', {
          type: 'geojson',
          data: props.nodes,
        });
        map.loadImage(
          'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
          function (error, image) {
            if (image) {
              map?.addImage('custom-marker', image);
            }
          },
        );

        map.addLayer({
          id: 'points',
          type: 'symbol',
          source: 'nodes',

          layout: {
            'icon-image': 'custom-marker',
            'text-field': ['get', 'title'],
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
            'text-offset': [0, 1.25],
            'text-anchor': 'top',
          },
        });
      } else {
        if (source.type === 'geojson') {
          source.setData(props.nodes);
        }
      }
    }
  }, [props.nodes]);
  useEffect(() => {
    const attachMap = (
      setMap: React.Dispatch<React.SetStateAction<any>>,
      mapDiv: React.RefObject<HTMLDivElement>,
    ) => {
      if (!mapDiv.current) {
        return;
      }
      const map = new mapboxgl.Map({
        container: mapDiv.current || '',
        style: 'mapbox://styles/mapbox/satellite-v9',
        center: [lng, lat],

        zoom: zoom,
      });
      setMap(map);

      map.on('load', () => {
        setMapLoaded(true);
        map.addSource('mapbox-dem', {
          type: 'raster-dem',
          url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
          tileSize: 512,
          maxzoom: 14,
        });
        // add the DEM source as a terrain layer with exaggerated height
        map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });

        // add a sky layer that will show when the map is highly pitched
        map.addLayer({
          id: 'sky',
          type: 'sky',
          paint: {
            'sky-type': 'atmosphere',
            'sky-atmosphere-sun': [0.0, 0.0],
            'sky-atmosphere-sun-intensity': 15,
          },
        });
      });

      map.on('move', () => {
        setLng(parseFloat(map.getCenter().lng.toPrecision(4)));
        setLat(parseFloat(map.getCenter().lat.toPrecision(4)));
        setZoom(parseFloat(map.getZoom().toPrecision(4)));
      });
    };

    !map && attachMap(setMap, mapDiv);
  }, [map]);

  return (
    // <div className="relative">
    <>
      <div className="w-screen h-screen flex-grow" ref={mapDiv} />
      <div className="flex fixed w-80 h-12 right-8 bottom-8 bg-gray-700 rounded-md ">
        <div className="m-auto text-white text-xl">
          Lat: <small>{lat}</small>, Lng: <small>{lng}</small>, Zoom:{' '}
          <small>{zoom}</small>
        </div>
      </div>
    </>
    //
    // </div>
  );
};

export default Map;
