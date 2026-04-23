import { ActivityOutcome } from '@staff-portal/graphql/staff'

import { ACTIVITY_OUTCOME_TEXT_MAPPING } from '../../config'
import { mapSelectOption } from '../../data'

const ACTIVITY_OUTCOME_OPTIONS_ORDER = [
  ActivityOutcome.COMPLETED,
  ActivityOutcome.CANCELLED,
  ActivityOutcome.RESCHEDULED,
  ActivityOutcome.OTHER
]

export const ACTIVITY_OUTCOME_OPTIONS_MAPPING = mapSelectOption(
  ACTIVITY_OUTCOME_TEXT_MAPPING,
  ACTIVITY_OUTCOME_OPTIONS_ORDER
)
