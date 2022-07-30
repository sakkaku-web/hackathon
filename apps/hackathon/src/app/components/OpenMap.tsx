import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
function OpenMap() {
  const [latitude, setLatitude] = useState(48.208492);
  const [longitude, setlongitude] = useState(16.373755);
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      scrollWheelZoom={false}
      className="h-44"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]}>
        <Popup>Your current location</Popup>
      </Marker>
    </MapContainer>
  );
}

export default OpenMap;
