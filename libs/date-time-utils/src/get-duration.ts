import getDurationText from './get-duration-text'

const getDuration = (durationMinutes: number) => {
  const hours = Math.floor(durationMinutes / 60)
  const minutes = durationMinutes % 60

  return getDurationText(hours, minutes)
}

export default getDuration
