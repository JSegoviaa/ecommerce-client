import moment from 'moment';

export const formatedDate = (date: string) => {
  const createdAt = moment(date);

  return createdAt.format('D MMMM YYYY, h:mm a');
};
