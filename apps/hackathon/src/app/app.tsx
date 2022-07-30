import OpenMap from './components/OpenMap';
import styles from './app.module.scss';
import { LatLngExpression } from 'leaflet';
import { MapContainer } from 'react-leaflet';
import ShoutOut from './components/ShautOut';
import ShautItems from './components/ShautItems';
import { useState } from 'react';

export function App() {
  const [id, setId] = useState('0');
  const DEFAULT_LAT_LONG: LatLngExpression | undefined = [48.208492, 16.373755];
  return (
    <div>
      <h1 className="text-2xl font-bold">Shouter</h1>
      <MapContainer
        center={DEFAULT_LAT_LONG}
        zoom={13}
        scrollWheelZoom={false}
        className="h-44"
      >
        <OpenMap />
      </MapContainer>
      <ShoutOut userId={id} />
      <ShautItems userId={id}></ShautItems>
    </div>
  );
}

export default App;
