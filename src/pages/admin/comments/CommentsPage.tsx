import { FC, useEffect } from 'react';
import { title } from '../../../constants';

const CommentsPage: FC = () => {
  useEffect(() => {
    document.title = `${title} | Comentarios`;
  }, []);

  return <div>CommentsPage</div>;
};

export default CommentsPage;
