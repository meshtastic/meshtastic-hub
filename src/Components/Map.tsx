import 'mapbox-gl/dist/mapbox-gl.css';

import React from 'react';

import mapboxgl from 'mapbox-gl';
import { renderToString } from 'react-dom/server';
import type { position } from 'src/App';

import { getDefaultMapStyle, MapStyle } from './Sidebar/MapStyleSelector';
import type { NodeDataProperties } from './Sidebar/Sidebar';

export interface MapProps {
  nodes: GeoJSON.FeatureCollection;
  darkmode: boolean;
  mapStyle: MapStyle;
  setPosition: React.Dispatch<React.SetStateAction<position>>;
}

const Map = (props: MapProps) => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoic2FjaGF3IiwiYSI6ImNrNW9meXozZjBsdW0zbHBjM2FnNnV6cmsifQ.3E4n8eFGD9ZOFo-XDVeZnQ';
  const mapDiv = React.useRef<HTMLDivElement>(null);
  let [map, setMap] = React.useState(null as mapboxgl.Map | null);
  const [lng, setLng] = React.useState(-70.9);
  const [lat, setLat] = React.useState(42.35);
  const [zoom, setZoom] = React.useState(9);
  const [gpsFound, setGpsFound] = React.useState<boolean>(false);

  React.useEffect(() => {
    map?.setStyle(props.mapStyle.url);
  }, [props.mapStyle]);

  const getLocation = () => {
    if (!gpsFound) {
      navigator.geolocation.getCurrentPosition((location) => {
        setLat(location.coords.latitude);
        setLng(location.coords.longitude);
      });
      setGpsFound(true);
    }
  };

  const PlaceNodes = () => {
    if (map) {
      if (props.nodes.type) {
        props.nodes.features.forEach((node) => {
          let data = node.properties as NodeDataProperties;
          if (map) {
            new mapboxgl.Marker({})
              .setLngLat({
                lat: data.position?.latitudeI
                  ? data.position.latitudeI / 1e7
                  : 90,
                lng: data.position?.longitudeI
                  ? data.position.longitudeI / 1e7
                  : 90,
              })
              .setPopup(
                new mapboxgl.Popup().setHTML(
                  renderToString(
                    <div>
                      <div className="text-xl font-medium">{data.longName}</div>
                      <ul>
                        <li>ID: {data.id}</li>
                        <li>Lat: {data.position?.latitudeI}</li>
                        <li>Long: {data.position?.longitudeI}</li>
                        <li>
                          Time:&nbsp;
                          {data.position?.time ? (
                            <span className="whitespace-no-wrap">
                              {new Date(
                                data.position.time * 1000,
                              ).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          ) : (
                            <span>Unknown</span>
                          )}
                        </li>
                      </ul>
                    </div>,
                  ),
                ),
              )

              /**
               * @todo this is broken
               */
              .on('mouseenter', () => {
                if (map) {
                  map.getCanvas().style.cursor = 'pointer';
                }
              })

              /**
               * @todo this is broken
               */
              .on('mouseleave', () => {
                if (map) {
                  map.getCanvas().style.cursor = '';
                }
              })

              .addTo(map);
          }
        });
      }
    }
  };

  React.useEffect(() => {
    const center = map?.getCenter();
    if (lat !== center?.lat && lng !== center?.lng) {
      map?.setCenter({
        lat,
        lng,
      });
    }
  }, [lat, lng]);

  React.useEffect(() => {
    PlaceNodes();
  }, [props.nodes]);

  React.useEffect(() => {
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
        getLocation();
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
        PlaceNodes();
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
