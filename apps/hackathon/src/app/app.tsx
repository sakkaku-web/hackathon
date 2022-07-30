import OpenMap from './components/OpenMap';
import { LatLngExpression } from 'leaflet';
import { MapContainer } from 'react-leaflet';
import ShoutOut from './components/ShautOut';
import { useEffect, useState } from 'react';
import { ChangeUser } from './components/ChangeUser';
import { ReactComponent as Megaphone } from '../assets/megaphone.svg';
import axios from 'axios';
import { environment } from '../environments/environment';
import { ShautMessage } from '@sakkaku-web/core';
import ShautItem from './components/ShautItem';
import ShautOut from './components/ShautOut';

const DEFAULT_LAT_LONG: LatLngExpression | undefined = [48.208492, 16.373755];

export function App() {
  const [id, setId] = useState(localStorage.getItem('shautDemoUser') || '0');
  const [messages, setMessages] = useState<ShautMessage[]>([]);
  const [showShautModal, setShowShautModal] = useState(false);

  const reloadMessages = () => {
    axios
      .get(`${environment.url}/messages/${id}`)
      .then((res) => setMessages(res.data));
  };

  useEffect(() => reloadMessages(), [id]);

  const updateId = (id: string) => {
    setId(id);
    localStorage.setItem('shautDemoUser', id);
  };

  return (
    <div>
      <header className="flex flex-row items-center justify-between px-4">
        <h1 className="text-2xl font-bold">Shauter</h1>

        <ChangeUser currentUser={id} onUserChange={updateId} />
      </header>
      <MapContainer
        center={DEFAULT_LAT_LONG}
        zoom={13}
        scrollWheelZoom={false}
        className="h-44"
      >
        <OpenMap />
      </MapContainer>

      {messages.map((item) => (
        <div key={item.time + item.user}>
          <ShautItem item={item} />
        </div>
      ))}

      {showShautModal && (
        <ShautOut
          userId={id}
          onShauted={() => reloadMessages()}
          onClose={() => setShowShautModal(false)}
        ></ShautOut>
      )}

      <button
        className="fixed bottom-10 right-4 rounded-full bg-orange-400 p-5"
        onClick={() => setShowShautModal(true)}
      >
        <Megaphone className="h-5 w-5 fill-white" />
      </button>
    </div>
  );
}

export default App;
