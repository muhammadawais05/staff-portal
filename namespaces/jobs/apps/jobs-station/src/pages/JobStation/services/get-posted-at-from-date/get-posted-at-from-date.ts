import { getDateString, subDays } from '@staff-portal/date-time-utils'

import { PostedAtRadioOptionValues, PostedAtOptions } from '../../types'

const POSTED_AT_OPTIONS: Record<PostedAtOptions, number | undefined> = {
  [PostedAtRadioOptionValues.TODAY]: 0,
  [PostedAtRadioOptionValues.LAST_7_DAYS]: 7,
  [PostedAtRadioOptionValues.LAST_14_DAYS]: 14,
  [PostedAtRadioOptionValues.LAST_30_DAYS]: 30,
  [PostedAtRadioOptionValues.CUSTOM]: undefined
}

export const getPostedAtFromDate = (postedAtKey: PostedAtOptions) => {
  const days =
    POSTED_AT_OPTIONS[postedAtKey || PostedAtRadioOptionValues.LAST_14_DAYS]

  if (days === undefined) {
    return
  }

  // eslint-disable-next-line @miovision/disallow-date/no-new-date
  return getDateString(subDays(new Date(), days))
}
