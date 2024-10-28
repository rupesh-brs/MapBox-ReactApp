import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './map.css'

mapboxgl.accessToken = "pk.eyJ1IjoicGFyaXNyaSIsImEiOiJja2ppNXpmaHUxNmIwMnpsbzd5YzczM2Q1In0.8VJaqwqZ_zh8qyeAuqWQgw";

const MapComponent = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    // Initialize the map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40], 
      zoom: 9, 
    });

  
    map.current.addControl(new mapboxgl.NavigationControl());

   
    map.current.addControl(new mapboxgl.FullscreenControl());

   
    map.current.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
    }));

 
    map.current.addControl(new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    }));

    
    return () => map.current.remove();
  }, []);

  return (
    <div className="map-wrapper">
      <h2 className="map-title">MapBox Using ReactJs</h2>
      <div ref={mapContainer} className="map-container" />
      <div className="map-footer">
        <p>Explore Locations Here.</p>
      </div>
    </div>
  );
};

export default MapComponent;