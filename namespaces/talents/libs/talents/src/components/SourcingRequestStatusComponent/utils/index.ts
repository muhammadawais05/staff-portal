import { SourcingRequestStatus } from '@staff-portal/graphql/staff'
import { titleize } from '@staff-portal/string'

import {
  SOURCING_REQUEST_STATUS_COLOR_MAPPING,
  SOURCING_REQUEST_STATUS_TEXT_MAPPING
} from '../../../config'

export const getSourcingRequestVerboseStatus = (
  status: SourcingRequestStatus
) =>
  SOURCING_REQUEST_STATUS_TEXT_MAPPING[status] ??
  titleize(status, { capitalizeAllWords: false })

export const getSourcingRequestStatusColor = (status: SourcingRequestStatus) =>
  SOURCING_REQUEST_STATUS_COLOR_MAPPING[status]
