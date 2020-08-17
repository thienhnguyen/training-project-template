const ready = (fn: () => void) => {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
};

const status = 'A few seconds ago';

function diffMinuteBetweenDates(date2: Date, date1: Date) {
  let diff = (date2.getTime() - new Date(date1).getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
}

export function formatDate(date: Date) {
  const modifiedDate = new Date(date);
  if (diffMinuteBetweenDates(new Date(), modifiedDate) < 1) {
    return status;
  }
  let month = `${modifiedDate.getMonth() + 1}`;
  let day = `${modifiedDate.getDate()}`;
  const year = modifiedDate.getFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return [year, month, day].join('-');
}

export default ready;
