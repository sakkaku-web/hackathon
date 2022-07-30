import OpenMap from './components/OpenMap';
import { LatLngExpression } from 'leaflet';
import { MapContainer } from 'react-leaflet';
import ShoutOut from './components/ShautOut';
import ShautItems from './components/ShautItems';
import { useState } from 'react';
import { ChangeUser } from './components/ChangeUser';
import { ReactComponent as Megaphone } from '../assets/megaphone.svg';

const DEFAULT_LAT_LONG: LatLngExpression | undefined = [48.208492, 16.373755];

export function App() {
  const [id, setId] = useState('0');
  return (
    <div>
      <header className="flex flex-row items-center justify-between px-4">
        <h1 className="text-2xl font-bold">Shauter</h1>

        <ChangeUser currentUser={id} onUserChange={(i) => setId(i)} />
      </header>
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
      <button className="fixed bottom-10 right-4 rounded-full bg-orange-400 p-5">
        <Megaphone className="h-5 w-5 fill-white" />
      </button>
    </div>
  );
}

export default App;
