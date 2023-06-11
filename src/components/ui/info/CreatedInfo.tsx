import { FC } from 'react';
import { formatedDate } from '../../../helpers';

interface Props {
  type: string;
  action1: string;
  action2: string;
  firstName?: string;
  lastName?: string;
  createdAt: string;
  updatedAt: string;
}

const CreatedInfo: FC<Props> = (props) => {
  const { createdAt, updatedAt, firstName, lastName, type, action1, action2 } =
    props;

  return (
    <>
      <div>
        {type} {action1} por {firstName} {lastName} el {formatedDate(createdAt)}
      </div>
      <div>
        {type} {action2} por {firstName} {lastName} el {formatedDate(updatedAt)}
      </div>
    </>
  );
};

export default CreatedInfo;
