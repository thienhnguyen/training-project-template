function diffMinuteBetweenDates(date2: Date, date1: Date) {
  let diff = (date2.getTime() - date1.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
}

export default function formatDate(date: Date) {
  if (diffMinuteBetweenDates(new Date(), date) < 1) {
    return 'A few seconds ago';
  }
  let month = `${date.getMonth() + 1}`;
  let day = `${date.getDate()}`;
  const year = date.getFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return [year, month, day].join('-');
}
