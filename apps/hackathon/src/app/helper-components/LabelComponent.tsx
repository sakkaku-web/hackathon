import { PropsWithChildren } from 'react';

interface LabelComponentProps {
  htmlFor: string;
}

function LabelComponent({
  htmlFor,
  children,
}: PropsWithChildren<LabelComponentProps>) {
  return (
    <label className="text-xl font-semibold" htmlFor={htmlFor}>
      {children}
    </label>
  );
}

export default LabelComponent;
