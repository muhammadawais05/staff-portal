import { TalentCumulativeStatus } from '@staff-portal/graphql/staff'
import { ColorType } from '@toptal/picasso'

export const TALENT_STATUS_MAPPING: Record<
  string,
  { text: string; color: ColorType }
> = {
  [TalentCumulativeStatus.ACTIVE]: { text: 'Active', color: 'green' },
  [TalentCumulativeStatus.APPLIED]: { text: 'Applied', color: 'yellow' },
  [TalentCumulativeStatus.IN_ONBOARDING]: {
    text: 'In onboarding',
    color: 'yellow'
  },
  [TalentCumulativeStatus.PAUSED]: { text: 'Paused', color: 'yellow' },
  [TalentCumulativeStatus.PENDING_PROFILE]: {
    text: 'Pending profile',
    color: 'yellow'
  },
  [TalentCumulativeStatus.REJECTED]: { text: 'Rejected', color: 'red' },

  // TODO: this status will be removed soon by https://toptal-core.atlassian.net/browse/TACO-1120
  REJECTED_AUTOMATIC: {
    text: 'Rejected (automatic)',
    color: 'red'
  },
  // TODO: this will be changed to strong type TalentCumulativeStatus by
  // this ticket https://toptal-core.atlassian.net/browse/TACO-1120
  REJECTED_BY_PRIORITIZER: {
    text: 'Rejected (automatic)',
    color: 'red'
  },

  [TalentCumulativeStatus.REJECTED_INACTIVE]: {
    text: 'Rejected (inactive)',
    color: 'red'
  },
  [TalentCumulativeStatus.REMOVED]: { text: 'Disbanded', color: 'red' }
}
