import OpenMap from './components/OpenMap';
import { LatLngExpression } from 'leaflet';
import { MapContainer } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { ChangeUser } from './components/ChangeUser';
import axios from 'axios';
import { environment } from '../environments/environment';
import { ShautMessage } from '@sakkaku-web/core';
import ShautItem from './components/ShautItem';
import ShautOut from './components/ShautOut';
import { ToastContainer, Slide } from 'react-toastify';

const DEFAULT_LAT_LONG: LatLngExpression | undefined = [48.208492, 16.373755];

export function App() {
  const [id, setId] = useState(localStorage.getItem('shautDemoUser') || '0');
  const [messages, setMessages] = useState<ShautMessage[]>([]);

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
      <header className="flex flex-row items-center justify-between p-4">
        <h1 className="text-2xl font-bold">Shauter</h1>

        <ChangeUser currentUser={id} onUserChange={updateId} />
      </header>
      <MapContainer
        center={DEFAULT_LAT_LONG}
        zoom={15}
        scrollWheelZoom={false}
        className="h-44"
      >
        <OpenMap />
      </MapContainer>

      {messages.length === 0 && (
        <div className="p-4 text-center font-semibold text-gray-500">
          No messages nearby
        </div>
      )}

      {messages.map((item) => (
        <div key={item.time + item.user}>
          <ShautItem item={item} />
        </div>
      ))}

      <ToastContainer transition={Slide} />
      <ShautOut userId={id} onShauted={() => reloadMessages()}></ShautOut>
    </div>
  );
}

export default App;
