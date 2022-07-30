import axios from 'axios';
import { useState } from 'react';
import { environment } from '../../environments/environment';
import LabelComponent from '../helper-components/LabelComponent';
import { Button } from './Button';

interface ShautOutProps {
  userId: string;
  onShauted: () => void;
}

function ShoutOut({ userId, onShauted }: ShautOutProps) {
  const [text, setMessage] = useState('');
  const [radius, setRadius] = useState(5);
  function getValue(e: React.ChangeEvent<HTMLInputElement>) {
    return setRadius(parseInt(e.target.value));
  }

  function submitShautOut() {
    axios
      .post(
        `${environment.url}/shaut`,
        { text, userId, radius },
        {
          headers: {
            'content-type': 'application/json',
          },
        }
      )
      .then((res) => console.log(res))
      .then(() => onShauted())
      .catch((err) => console.log(err));
  }

  return (
    <div className="m-4 rounded-md border-2 border-black p-4">
      <div className="mb-2 flex flex-col">
        <LabelComponent htmlFor="message">Your Message</LabelComponent>
        <textarea
          className="rounded-md border border-black p-3 pt-2"
          name="text"
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
      <Button onClick={() => submitShautOut()}>Shout Out</Button>
    </div>
  );
}

export default ShoutOut;
