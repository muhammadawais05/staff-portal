const getHoursText = (hours: number): string => {
  if (!hours) {
    return ''
  }

  const suffix = hours > 1 ? 's' : ''

  return `${hours} hour${suffix}`
}

const getMinutesText = (minutes: number): string => {
  if (!minutes) {
    return ''
  }

  const suffix = minutes > 1 ? 's' : ''

  return `${minutes} minute${suffix}`
}

const getDurationText = (hours: number, minutes: number) => {
  const hoursText = getHoursText(hours)
  const minutesText = getMinutesText(minutes)

  if (hours > 0 && minutes > 0) {
    return `${hoursText} and ${minutesText}`
  }

  if (hours > 0) {
    return hoursText
  }

  return minutesText
}

export default getDurationText
