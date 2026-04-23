import { capitalize } from '@toptal/picasso/utils'
import { parseISO, formatDistance, isBefore } from 'date-fns'

const getDateDistanceFromNow = (
  date: string,
  options: {
    hideSuffix?: boolean
  } = {}
): string => {
  const { hideSuffix = false } = options
  const now = new Date()
  const parsedDate = parseISO(date)
  const suffix = isBefore(parsedDate, now) ? ' ago' : ' from now'

  return capitalize(
    formatDistance(parsedDate, now) + (hideSuffix ? '' : suffix)
  )
}

export default getDateDistanceFromNow
