import { Maybe } from '@toptal/picasso/utils'

export const getDateForForm = (date: Maybe<string>) =>
  // eslint-disable-next-line @miovision/disallow-date/no-new-date
  date ? new Date(date) : undefined
