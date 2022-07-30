import OpenMap from './components/OpenMap';
import styles from './app.module.scss';
import { LatLngExpression } from 'leaflet';
import { MapContainer } from 'react-leaflet';
import ShoutOut from './components/ShautOut';

export function App() {
  const DEFAULT_LAT_LONG: LatLngExpression | undefined = [48.208492, 16.373755];
  return (
    <>
      <h1 className="font-bold text-2xl">Hello World</h1>
      <MapContainer
        center={DEFAULT_LAT_LONG}
        zoom={13}
        scrollWheelZoom={false}
        className="h-44"
      >
        <OpenMap />
      </MapContainer>
      <ShoutOut />
    </>
  );
}

export default App;
