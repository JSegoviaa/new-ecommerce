import { FC, useEffect } from 'react';
import { title } from '../../constants';

const HomePage: FC = () => {
  useEffect(() => {
    document.title = `${title} | Inicio`;
  }, []);

  return <div>HomePage</div>;
};

export default HomePage;
