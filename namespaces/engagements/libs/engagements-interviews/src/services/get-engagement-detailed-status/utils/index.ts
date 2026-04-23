import {
  getFormattedDate,
  UNDEFINED_VALUE
} from '@staff-portal/date-time-utils'

// prepare, uniq, join
export const joinTimes = (times?: string[]) =>
  times
    ? times
        .map(time => getFormattedDate(time))
        .filter((item, index, array) => array.indexOf(item) === index)
        .join(' and ')
    : UNDEFINED_VALUE
