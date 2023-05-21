import { FC, useEffect } from 'react';
import { title } from '../../../constants';

const RatingsPage: FC = () => {
  useEffect(() => {
    document.title = `${title} | Ratings`;
  }, []);
  return <div>RatingsPage</div>;
};

export default RatingsPage;
