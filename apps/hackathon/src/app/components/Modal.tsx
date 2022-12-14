import { PropsWithChildren } from 'react';
import { ReactComponent as CloseIcon } from '../../assets/x.svg';
import SpinnerComponent from '../helper-components/SpinnerComponent';
import { Button } from './Button';

/* eslint-disable-next-line */
export interface ModalProps extends PropsWithChildren {
  open: boolean;
  buttonText: string;
  onClose: () => void;
  onSubmit: () => void;
  loading: boolean;
}

export function Modal({
  open,
  buttonText,
  children,
  onSubmit,
  onClose,
  loading,
}: ModalProps) {
  const translate = open ? 'translate-y-0' : 'translate-y-full';

  return (
    <div
      className={`fixed inset-0 backdrop-blur-md transition-transform duration-300 ${translate}`}
      style={{ zIndex: 99999 }}
    >
      <div className="fixed inset-0 -z-10" onClick={() => onClose()}></div>
      <div className="flex flex-row items-center justify-between border-b bg-white p-2">
        <CloseIcon
          className="h-8 w-8 cursor-pointer"
          onClick={() => onClose()}
        />
        <Button
          disabled={loading}
          onClick={() => onSubmit()}
          className="flex flex-row items-center gap-2"
        >
          {loading && <SpinnerComponent></SpinnerComponent>}
          <span> {buttonText}</span>
        </Button>
      </div>
      <div className="p-2">{children}</div>
    </div>
  );
}

export default Modal;
