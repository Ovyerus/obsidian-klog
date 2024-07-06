export const formatMomentDuration = (duration: moment.Duration) => {
  const hours = Math.floor(duration.asHours());
  const minutes = duration.minutes();

  const hoursStr = hours ? `${hours} hours` : "";
  const joinStr = hours && minutes ? " and " : "";
  const minutesStr = minutes ? `${minutes} minutes` : "";

  return hoursStr + joinStr + minutesStr;
};
