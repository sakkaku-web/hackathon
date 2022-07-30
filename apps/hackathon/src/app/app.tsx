import OpenMap from './components/OpenMap';
import styles from './app.module.scss';
import { LatLngExpression } from 'leaflet';
import { MapContainer } from 'react-leaflet';
import ShoutOut from './components/ShautOut';

export function App() {
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
      <ShoutOut />
    </div>
  );
}

export default App;
