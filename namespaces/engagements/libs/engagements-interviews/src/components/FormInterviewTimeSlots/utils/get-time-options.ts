import { padWithZero } from '@staff-portal/utils'

export const getTimeOptions = () => {
  const hours = []

  for (let hourIndex = 0; hourIndex < 24; hourIndex++) {
    const hour = ((hourIndex + 11) % 12) + 1
    const period = hourIndex < 12 ? 'AM' : 'PM'

    // the 11:45 PM option is missing
    const maxMinutes = hourIndex < 23 ? 45 : 30

    for (let minuteIndex = 0; minuteIndex <= maxMinutes; minuteIndex += 15) {
      hours.push(`${padWithZero(hour)}:${padWithZero(minuteIndex)} ${period}`)
    }
  }

  return hours.map(value => ({ value, text: value }))
}
