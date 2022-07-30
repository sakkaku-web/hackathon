import { MouseEvent, PropsWithChildren } from 'react';

/* eslint-disable-next-line */
export interface ButtonProps extends PropsWithChildren {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function Button({ onClick, children }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="rounded-full bg-green-600 px-5 py-2 text-center font-semibold text-white"
    >
      {children}
    </button>
  );
}

export default Button;
