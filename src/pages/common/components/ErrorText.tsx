import { PropsWithChildren } from 'react';

const ErrorText = ({ children }: PropsWithChildren) => {
  return <p className="text-red-500 p-2">{children}</p>;
};

export default ErrorText;
