export default function getTimeNotation(publishedAt) {
  const seconds = Math.floor((new Date() - new Date(publishedAt)) / 1000);

  const oneDay = 86400;
  const oneHour = 3600;
  const oneMinute = 60;

  let timeInUnit = 0;
  let dateUnit = '';
  if (seconds >= oneDay) {
    timeInUnit = Math.floor(seconds / oneDay);
    dateUnit = 'day';
  } else if (seconds >= oneHour) {
    timeInUnit = Math.floor(seconds / oneHour);
    dateUnit = 'hour';
  } else if (seconds >= oneMinute) {
    timeInUnit = Math.floor(seconds / oneMinute);
    dateUnit = 'minute';
  } else {
    timeInUnit = seconds;
    dateUnit = 'second';
  }
  return timeInUnit + ' ' + dateUnit + (timeInUnit === 1 ? '' : 's') + ' ago';
}
