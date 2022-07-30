import { useEffect, useState } from 'react';
import { LatLngExpression } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
function OpenMap() {
  const [latLong, setLatLong] = useState<LatLngExpression>([
    48.208492, 16.373755,
  ]);
  function success(pos: GeolocationPosition): void {
    const coordinates = pos.coords;
    setLatLong([coordinates.latitude, coordinates.longitude]);
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  const map = useMap();
  useEffect(() => {
    map.setView(latLong);
  }, [latLong]);

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={latLong}>
        <Popup>Your current location</Popup>
      </Marker>
    </>
  );
}

export default OpenMap;
