import { MouseEvent, PropsWithChildren } from 'react';

/* eslint-disable-next-line */
export interface ButtonProps extends PropsWithChildren {
  className?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export function Button({
  onClick,
  children,
  className,
  disabled,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={
        'rounded-full bg-orange-400 px-5 py-2 text-center font-semibold text-white disabled:bg-orange-200 ' +
          className || ''
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
