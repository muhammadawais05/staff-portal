import { gql, useQuery } from '@staff-portal/data-layer-service'
import {
  TALENT_ENGAGEMENT_RATES_FRAGMENT,
  TALENT_AVAILABILITY_RESPONSE_SPEED_FRAGMENT,
  TALENT_TRIAL_RATE_FRAGMENT,
  CLIENT_WILL_HIRE_AGAIN_FRAGMENT,
  TALENT_DELTA_WAITING_TIME_FRAGMENT,
  TALENT_REPEATED_CLIENTS_FRAGMENT,
  ELIGIBLE_JOBS_STATISTICS_FRAGMENT
} from '@staff-portal/talents'

import { GetTalentStatsSectionDocument } from './get-talent-stats-section.staff.gql.types'

export default gql`
  query GetTalentStatsSection($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        cumulativeStatus
        ...TalentTrialRateFragment
        ...TalentAvailabilityResponseSpeedFragment
        ...TalentEngagementRatesFragment
        ...ClientWillHireAgainFragment
        ...TalentDeltaWaitingTimeFragment
        ...TalentRepeatedClientsFragment
        ...EligibleJobsStatisticsFragment
      }
    }
  }

  ${TALENT_AVAILABILITY_RESPONSE_SPEED_FRAGMENT}
  ${TALENT_TRIAL_RATE_FRAGMENT}
  ${TALENT_ENGAGEMENT_RATES_FRAGMENT}
  ${CLIENT_WILL_HIRE_AGAIN_FRAGMENT}
  ${TALENT_DELTA_WAITING_TIME_FRAGMENT}
  ${TALENT_REPEATED_CLIENTS_FRAGMENT}
  ${ELIGIBLE_JOBS_STATISTICS_FRAGMENT}
`

export const useGetTalentStatsSection = ({
  talentId,
  onError
}: {
  talentId: string
  onError: () => void
}) => {
  const { data, loading, error } = useQuery(GetTalentStatsSectionDocument, {
    onError,
    variables: {
      talentId
    }
  })

  return {
    data: data?.node,
    loading: loading && !data,
    error
  }
}
