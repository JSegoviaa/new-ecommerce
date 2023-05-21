import { FC } from 'react';

interface Props {
  msg?: string;
}

const Loading: FC<Props> = ({ msg = '' }) => {
  return <h1>{msg}</h1>;
};

export default Loading;
