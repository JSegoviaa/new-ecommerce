import dayjs from 'dayjs';
import 'dayjs/locale/es-mx';

export const formatedDate = (date: string): string => {
  return dayjs(date).locale('es-mx').format('D MMMM YYYY, h:mm a');
};
