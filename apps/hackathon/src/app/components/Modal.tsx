import { PropsWithChildren } from 'react';
import { ReactComponent as CloseIcon } from '../../assets/x.svg';
import { Button } from './Button';

/* eslint-disable-next-line */
export interface ModalProps extends PropsWithChildren {
  open: boolean;
  buttonText: string;
  onClose: () => void;
  onSubmit: () => void;
}

export function Modal({
  open,
  buttonText,
  children,
  onSubmit,
  onClose,
}: ModalProps) {
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {open && (
        <div
          className="absolute inset-0 backdrop-blur-md"
          style={{ zIndex: 999999 }}
        >
          <div className="flex flex-row items-center justify-between border-b bg-white p-2">
            <CloseIcon className="h-8 w-8" onClick={() => onClose()} />
            <Button onClick={() => onSubmit()}>{buttonText}</Button>
          </div>
          <div className="p-2">{children}</div>
        </div>
      )}
    </>
  );
}

export default Modal;
