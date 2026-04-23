const formatDuration = (durationSeconds: number) => {
  const minutes = Math.floor(durationSeconds / 60)
  const seconds = durationSeconds % 60

  return `${minutes.toString().length === 1 ? `0${minutes}` : minutes}:${
    seconds.toString().length === 1 ? `0${seconds}` : seconds
  }`
}

export default formatDuration
