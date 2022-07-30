import axios from 'axios';
import { useState } from 'react';
import { environment } from '../../environments/environment';

function ShoutOut() {
  const [message, setMessage] = useState('');
  const [id, setId] = useState('0');
  const [radius, setRadius] = useState(5);
  function getValue(e: React.ChangeEvent<HTMLInputElement>) {
    return setRadius(parseInt(e.target.value));
  }

  function submitShautOut() {
    axios
      .post(`${environment.url}/shaut`, { message, id, radius })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <div>
        <label htmlFor="message">Your message</label>
        <textarea
          className="rounded-md border border-black"
          name="message"
          placeholder="What would you like to shout out?"
          id="message"
          cols={40}
          rows={5}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label htmlFor="slider">How far?</label>
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
