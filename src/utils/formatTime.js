export const formatTime = (time) => {
  let hms = '';
  let seconds = Math.floor(time % 60);
  let minutes = Math.floor(time / 60) % 60;
  let hours = Math.floor(time / 3600);

  let s = seconds.toString().padStart(2, '0');
  let m = minutes.toString().padStart(2, '0');
  let h = hours.toString().padStart(2, '0');

  hms = `${h}:${m}:${s}`;

  if (time == undefined || isNaN(time) || time < 0) {
    return null;
  } else {
    return hms;
  }
};
