import pluralize from 'pluralize'

const getMeetingDurations = (durationInSeconds: number) => {
  const durationInMinutes = Math.floor(durationInSeconds / 60)

  return `${durationInMinutes} ${pluralize('minute', durationInMinutes)}`
}

export default getMeetingDurations
