import { ActivityType } from '@staff-portal/graphql/staff'

import { ACTIVITY_TYPE_TEXT_MAPPING } from '../../config'
import { mapSelectOption } from '../../data'

const ACTIVITY_TYPES_OPTIONS_ORDER = [
  ActivityType.CLIENT_RELATED,
  ActivityType.TALENT_RELATED,
  ActivityType.JOB_RELATED,
  ActivityType.INTERNAL,
  ActivityType.OTHER
]

export const ACTIVITY_TYPES_OPTIONS = mapSelectOption(
  ACTIVITY_TYPE_TEXT_MAPPING,
  ACTIVITY_TYPES_OPTIONS_ORDER
)
