import { FC, useContext, useEffect } from 'react';
import { title } from '../../constants';
import { AuthContext } from '../../contexts';

const HomePage: FC = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    document.title = `${title} | Inicio`;
  }, []);

  return (
    <div>
      HomePage
      <br />
      <h1>{user?.email}</h1>
    </div>
  );
};

export default HomePage;
