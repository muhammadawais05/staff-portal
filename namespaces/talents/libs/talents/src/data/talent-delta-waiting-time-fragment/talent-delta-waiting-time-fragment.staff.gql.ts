import { gql } from '@staff-portal/data-layer-service'

export const TALENT_DELTA_WAITING_TIME_FRAGMENT = gql`
  fragment TalentDeltaWaitingTimeFragment on Talent {
    id
    deltaWaitingDays
    lastClosedEngagementEndDate
    lastAvailabilityIncreaseDate
    engagements {
      counters {
        trialsNumber
      }
    }
  }
`
