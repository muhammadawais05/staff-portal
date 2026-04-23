export const getTimeValue = (hour: number, minute: number) => {
  const hourWithLeadingZero = (hour < 10 ? '0' : '') + hour
  const minutesWithleadingZero = (minute < 10 ? '0' : '') + minute

  return `${hourWithLeadingZero}:${minutesWithleadingZero}:00`
}
