import OpenMap from './components/OpenMap';
import styles from './app.module.scss';
import { MapContainer } from 'react-leaflet';

export function App() {
  return (
    <>
      <h1 className="font-bold text-2xl">Hello World</h1>
      <MapContainer
        center={[48.208492, 16.373755]}
        zoom={13}
        scrollWheelZoom={false}
        className="h-44"
      >
        <OpenMap />
      </MapContainer>
    </>
  );
}

export default App;
