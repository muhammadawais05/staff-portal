import {
  TalentCumulativeStatus,
  TalentDetailedStatuses
} from '@staff-portal/graphql/staff'
import { ColorType } from '@toptal/picasso'
import { TALENT_STATUS_MAPPING } from '@staff-portal/talents'

export const TALENT_DETAILED_STATUS_MAPPING: Record<
  TalentDetailedStatuses | TalentCumulativeStatus | string,
  { text: string; color?: ColorType }
> = {
  ...TALENT_STATUS_MAPPING,
  [TalentDetailedStatuses.PAUSED]: { text: 'Paused', color: 'black' },
  [TalentDetailedStatuses.ENGLISH_CLAIM]: {
    text: 'Pending English Claim',
    color: 'yellow'
  },
  [TalentDetailedStatuses.ENGLISH_COMPLETION]: {
    text: 'Pending English Completion',
    color: 'yellow'
  },
  [TalentDetailedStatuses.TECHNICAL_ONE]: {
    text: 'In Tech Screen 1',
    color: 'yellow'
  },
  [TalentDetailedStatuses.TECHNICAL_TWO]: {
    text: 'In Tech Screen 2',
    color: 'yellow'
  },
  [TalentDetailedStatuses.MISSING_LAST_STEPS]: {
    text: 'Missing Last Steps',
    color: 'yellow'
  },
  [TalentDetailedStatuses.ENGLISH_APPROVED]: {
    text: 'English Approved',
    color: 'yellow'
  },
  [TalentDetailedStatuses.ONLINE_TEST]: {
    text: 'Pending Online Test Completion',
    color: 'yellow'
  },
  [TalentDetailedStatuses.SCREENING]: { text: 'In Screening', color: 'yellow' }
}
