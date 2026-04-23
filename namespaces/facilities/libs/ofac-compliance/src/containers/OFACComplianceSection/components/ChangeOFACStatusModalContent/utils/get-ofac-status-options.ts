import { titleize } from '@staff-portal/string'
import { Maybe, OfacStatus } from '@staff-portal/graphql/staff'

export const getOfacStatusOptions = (currentStatus: Maybe<OfacStatus>) =>
  Object.values(OfacStatus)
    .filter(value => value !== currentStatus)
    .sort(status => (status === OfacStatus.NORMAL ? -1 : 0))
    .map(value => ({
      value,
      text: titleize(value)
    }))
