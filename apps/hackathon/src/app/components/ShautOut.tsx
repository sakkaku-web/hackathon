import axios from 'axios';
import { useState } from 'react';
import { environment } from '../../environments/environment';
import LabelComponent from '../helper-components/LabelComponent';
import { Modal } from './Modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReactComponent as Megaphone } from '../../assets/megaphone.svg';

interface ShautOutProps {
  userId: string;
  onShauted: () => void;
}

function ShoutOut({ userId, onShauted }: ShautOutProps) {
  const [text, setMessage] = useState('');
  const [radius, setRadius] = useState(5);
  const [showModal, setShowModal] = useState(false);

  function reset() {
    setMessage('');
  }

  function onClose() {
    setShowModal(false);
  }

  function submitShautOut() {
    axios
      .post(`${environment.url}/shaut`, { text, userId, radius })
      .then((res) => {
        console.log(res);
        toast.success('Shout out successfully created', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        onShauted();
        onClose();
        reset();
      })
      .catch((err) => {
        console.log(err);
        toast.error('Oops something went wrong', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }

  return (
    <>
      <Modal
        open={showModal}
        buttonText="Shout Out"
        onClose={onClose}
        onSubmit={() => submitShautOut()}
      >
        <div className="m-4 rounded-md border-2 bg-white p-4">
          <div className="mb-2 flex flex-col gap-2">
            <LabelComponent htmlFor="message">Your Message</LabelComponent>
            <textarea
              className="rounded-md border border-black p-3 pt-2 outline-2 outline-orange-400 focus:outline"
              name="text"
              placeholder="What would you like to shout out?"
              id="message"
              cols={40}
              rows={5}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-2 flex flex-col gap-2">
            <LabelComponent htmlFor="slider">How far?</LabelComponent>
            <input
              type="range"
              onChange={(e) => setRadius(parseInt(e.target.value))}
              id="slider"
              name="range"
              min={1}
              max={10}
              value={radius}
            />
            <p>Radius: {radius} km</p>
          </div>
        </div>
      </Modal>

      <button
        className="fixed bottom-10 right-4 rounded-full bg-orange-400 p-5"
        onClick={() => setShowModal(true)}
      >
        <Megaphone className="h-5 w-5 fill-white" />
      </button>
    </>
  );
}

export default ShoutOut;
