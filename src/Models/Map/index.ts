import mapboxgl from "mapbox-gl"
import { getDefaultMapStyle } from "src/Components/Sidebar/MapStyleSelect"


export class MapClass {
  Map;

  constructor(options: MapOptions) {
    const { accessToken, view, state, DOM } = options;
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2FjaGF3IiwiYSI6ImNrNW9meXozZjBsdW0zbHBjM2FnNnV6cmsifQ.3E4n8eFGD9ZOFo-XDVeZnQ';

    this.Map = new mapboxgl.Map({
      container: DOM.containerId,
      style: DOM.style,
      center: view.coords,
      zoom: view.zoom,
    });

    this.Map.on('load', this.buildLayout);
  }

  buildLayout = () => {
    this.Map.addSource('mapbox-dem', {
      type: 'raster-dem',
      url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
      tileSize: 512,
      maxzoom: 14,
    });
    // add the DEM source as a terrain layer with exaggerated height
    this.Map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });

    // add a sky layer that will show when the map is highly pitched
    this.Map.addLayer({
      id: 'sky',
      type: 'sky',
      paint: {
        'sky-type': 'atmosphere',
        'sky-atmosphere-sun': [0.0, 0.0],
        'sky-atmosphere-sun-intensity': 15,
      },
    });

    this.Map.loadImage(
      'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
      (image) => {
        if (image) {
          this.Map.addImage('custom-marker', image);
        }
      },
    );

    this.Map.on('move', () => {
      const currentLat = map.getCenter().lat;
      const currentLng = map.getCenter().lng;
      setCoords({lat:currentLat, lng:currentLng})
      setZoom(parseFloat(map.getZoom().toPrecision(4)));
      props.setPosition({
        lat: currentLat,
        lng: currentLng,
      });
    });
  };

  }
}
