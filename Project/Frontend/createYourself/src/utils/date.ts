export function formatDate(date: Date) {
  return `${date.toLocaleDateString('de-CH', {day: '2-digit'})}. ${date.toLocaleDateString('de-CH', {month: 'short'})}. ${date.getFullYear()}`
}

export function getDateGap(date: Date) : string {
  const now = new Date();

  const diffMilliseconds = now.getTime() - date.getTime();

  const totalSeconds = Math.floor(diffMilliseconds / 1000);

  // Total number of minutes in the difference
  const totalMinutes = Math.floor(totalSeconds / 60);

  // Total number of hours in the difference
  const totalHours = Math.floor(totalMinutes / 60);

  // Total number of days in the difference
  const totalDays = Math.floor(totalHours / 24);

  // Getting the number of seconds left in one minute
  const remSeconds = totalSeconds % 60;

  // Getting the number of minutes left in one hour
  const remMinutes = totalMinutes % 60;

  if(totalMinutes < 60) {
    return `Vor ${totalMinutes} min`;
  }
  if(totalHours < 24) {
    return `Vor ${totalHours} min`;
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if(date.getDate() === yesterday.getDate()) {
    return `Gestern, ${getTime(date)}`;
  }

  if(date.getFullYear() === now.getFullYear()) {
    return `Am ${date.getDay()}. ${date.toLocaleString('de-CH', { month: 'long'})} - ${getTime(date)}`;
  }

  else{
    return `${date.getFullYear()}, ${date.getDay()}. ${date.toLocaleString('de-CH', { month: 'long'})} - ${getTime(date)}`;
  }
}

function getTime(date: Date) : string{
  return `${formatTime(date.getHours())}:${formatTime(date.getMinutes())} Uhr`;
}

export function formatTime(value: number) : string{
  return value.toString().padStart(2, '0');
}
