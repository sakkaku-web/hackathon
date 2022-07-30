import { useState } from 'react';

function ShoutOut() {
  const [radius, setRadius] = useState(5);
  function getValue(e: React.ChangeEvent<HTMLInputElement>) {
    return setRadius(parseInt(e.target.value));
  }

  return (
    <div>
      <div>
        <label htmlFor="shout-out">Your message</label>
        <textarea
          className="rounded-md border border-black"
          name="shout-out"
          placeholder="What would you like to shout out?"
          id="shout-out"
          cols={40}
          rows={5}
        ></textarea>
      </div>
      <div>
        <label htmlFor="slider">How far?</label>
        <input
          type="range"
          onChange={(e) => getValue(e)}
          id="slider"
          name="range"
          min={1}
          max={10}
          value={radius}
        />
        <p>Radius: {radius} km</p>
      </div>
      <button className="rounded-full bg-green-600 px-5 py-2 text-center font-semibold text-white">
        Shout Out
      </button>
    </div>
  );
}

export default ShoutOut;
