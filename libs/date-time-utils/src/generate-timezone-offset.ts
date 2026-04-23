const SECONDS_IN_HOUR = 3600

const generateTimezoneOffset = (seconds: number, timeStandard = 'GMT') => {
  const offset = seconds / SECONDS_IN_HOUR
  const sign = offset < 0 ? '-' : '+'
  const stringOffset = String(Math.abs(offset))
  const hours = stringOffset.length === 2 ? stringOffset : `0${stringOffset}`

  return `${timeStandard}${sign}${hours}:00`
}

export default generateTimezoneOffset
