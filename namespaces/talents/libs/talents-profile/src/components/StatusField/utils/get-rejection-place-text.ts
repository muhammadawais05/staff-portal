import { capitalize } from '@toptal/picasso/utils'
import { TalentSpecializationApplicationStatus } from '@staff-portal/graphql/staff'

import { SPECIALIZATION_APPLICATION_STATUS_TEXT_MAPPING } from '../config'

export const getRejectionPlaceText = (
  rejectionPlace: string,
  status?: TalentSpecializationApplicationStatus | null
) =>
  status &&
  `${SPECIALIZATION_APPLICATION_STATUS_TEXT_MAPPING[status]} at ${capitalize(
    rejectionPlace.replace(/_/g, ' ')
  )}.`
