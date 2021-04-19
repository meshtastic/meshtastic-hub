import 'mapbox-gl/dist/mapbox-gl.css';

import React, { useEffect, useRef, useState } from 'react';
import { renderToString } from 'react-dom/server'
import mapboxgl from 'mapbox-gl';
import type { position } from 'src/App';

import { getDefaultMapStyle, MapStyle } from './Sidebar/MapStyleSelect';


export interface MapProps {
  nodes: GeoJSON.FeatureCollection;
  darkmode: boolean;
  mapStyle: MapStyle;
  setPosition: React.Dispatch<React.SetStateAction<position>>;
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
    map?.setStyle(props.mapStyle.url);
  }, [props.mapStyle]);

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

        map.on('click', 'points', (e) => {
          if (map && e.features && e.features.length > 0 && e.features[0].properties) {
            const properties = e.features[0].properties;
            const position = JSON.parse(properties.position || '{}');

            new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(
                renderToString(
                  <div>
                    <div className="text-xl font-medium">
                      {properties?.longName}
                    </div>
                    <ul>
                      <li>
                        ID: {properties?.id}
                      </li>
                      <li>
                        Lat: {e.lngLat.lat}
                      </li>
                      <li>
                        Long: {e.lngLat.lng}
                      </li>
                      <li>
                        Time:&nbsp;
                        {position?.time ? (
                          <span className="whitespace-no-wrap">
                            {new Date(position.time * 1000).toLocaleTimeString(
                              [],
                              { hour: '2-digit', minute: '2-digit' },
                            )}
                          </span>
                        ) : (
                          <span>Unknown</span>
                        )}
                      </li>
                    </ul>
                  </div>
                )
              )
              .addTo(map);
          }
        });

        map.on('mouseenter', 'points', () => {
          if (map) {
            map.getCanvas().style.cursor = 'pointer';
          }
        });
           
        map.on('mouseleave', 'points', () => {
          if (map) {
            map.getCanvas().style.cursor = '';
          }
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
        style: getDefaultMapStyle(props.darkmode, props.mapStyle).url,
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
        const currentLat = map.getCenter().lat;
        const currentLng = map.getCenter().lng;
        setLng(currentLng);
        setLat(currentLat);
        setZoom(parseFloat(map.getZoom().toPrecision(4)));
        props.setPosition({
          lat: currentLat,
          lng: currentLng,
        });
      });
    };

    !map && attachMap(setMap, mapDiv);
  }, [map]);

  return <div className="w-screen h-screen flex-grow" ref={mapDiv} />;
};

export default Map;
