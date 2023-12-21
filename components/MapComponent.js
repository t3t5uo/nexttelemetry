// components/MapComponent.js
'use client'
import React, { useEffect } from 'react';
import fetchFromAirtable from '../utils/fetchFromAirtable';

const MapComponent = () => {
  useEffect(() => {
    const initMap = async () => {
      const items = await fetchFromAirtable();
      const locations = items.map(item => ({
        lat: parseFloat(item.fields.latitude),
        lng: parseFloat(item.fields.longitude),
        timestamp: new Date(parseInt(item.fields.event_time_milliseconds)).toLocaleString(),
        origin: item.fields.origin,
        vehiclePlacardNumber: item.fields.vehicle_placard_number
      }));

      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: locations[0]
      });

      locations.forEach(location => {
        const marker = new google.maps.Marker({
          position: location,
          map: map
        });

        const infowindow = new google.maps.InfoWindow({
          content: `Timestamp: ${location.timestamp}<br>Origin: ${location.origin}<br>Vehicle Placard Number: ${location.vehiclePlacardNumber}`
        });

        marker.addListener('click', () => {
          infowindow.open(map, marker);
        });
      });
    };

    // Load Google Maps script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDvP3E8ICYEQYe5EY--HT4DFcorGgppsxs&callback=initMap`;
    script.async = true;
    document.head.appendChild(script);

    window.initMap = initMap;
  }, []);

  return <div id="map" style={{ height: '800px', width: '100%' }}></div>;
};

export default MapComponent;
