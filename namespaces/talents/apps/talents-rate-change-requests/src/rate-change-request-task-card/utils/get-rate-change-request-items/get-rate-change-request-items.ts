import { TaskCardLayoutContentItem } from '@staff-portal/tasks'

import { RATE_CHANGE_REQUEST_CONFIGURATION } from '../../config'
import { RateChangeRequestFragment } from '../../../data'
import { getRateChangeRequestMapping } from './get-rate-change-request-mapping'

export const getRateChangeRequestContentItems = (
  rateChangeRequest: RateChangeRequestFragment
): TaskCardLayoutContentItem[] => {
  const contentMapping = getRateChangeRequestMapping(rateChangeRequest)

  return RATE_CHANGE_REQUEST_CONFIGURATION.map(key => ({
    key,
    ...contentMapping[key]
  }))
}
