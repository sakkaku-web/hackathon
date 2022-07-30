import axios from 'axios';
import { useState } from 'react';
import { environment } from '../../environments/environment';
import LabelComponent from '../helper-components/LabelComponent';

interface ShautOutProps {
  userId: string;
}

function ShoutOut({ userId }: ShautOutProps) {
  const [message, setMessage] = useState('');
  const [radius, setRadius] = useState(5);
  function getValue(e: React.ChangeEvent<HTMLInputElement>) {
    return setRadius(parseInt(e.target.value));
  }

  function submitShautOut() {
    axios
      .post(`${environment.url}/shaut`, { message, userId, radius })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    <div className="m-4 rounded-md border-2 border-black p-4">
      <div className="mb-2 flex flex-col">
        <LabelComponent htmlFor="message">Your Message</LabelComponent>
        <textarea
          className="rounded-md border border-black p-3 pt-2"
          name="message"
          placeholder="What would you like to shout out?"
          id="message"
          cols={40}
          rows={5}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </div>
      <div className="mb-2 flex flex-col">
        <LabelComponent htmlFor="slider">How far?</LabelComponent>
        <input
          type="range"
          onChange={(e) => {
            getValue(e);
            setRadius(parseInt(e.target.value));
          }}
          id="slider"
          name="range"
          min={1}
          max={10}
          value={radius}
        />
        <p>Radius: {radius} km</p>
      </div>
      <button
        onClick={() => submitShautOut}
        className="rounded-full bg-green-600 px-5 py-2 text-center font-semibold text-white"
      >
        Shout Out
      </button>
    </div>
  );
}

export default ShoutOut;
