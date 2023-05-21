import { FC, useEffect } from 'react';

import { title } from '../../constants';

const RenewPassword: FC = () => {
  useEffect(() => {
    document.title = `${title} | Recuperar Contraseña`;
  }, []);

  return <div>RenewPassword</div>;
};

export default RenewPassword;
