export const getStatusColor = ({
  pureScore,
  acceptThreshold = 0,
  rejectThreshold = 0
}: {
  pureScore?: number | null
  acceptThreshold: number
  rejectThreshold: number
}) => {
  if (pureScore === null || pureScore === undefined) {
    return
  }

  if (pureScore < rejectThreshold) {
    return 'red'
  }

  if (pureScore >= acceptThreshold) {
    return 'green'
  }

  return 'yellow'
}
