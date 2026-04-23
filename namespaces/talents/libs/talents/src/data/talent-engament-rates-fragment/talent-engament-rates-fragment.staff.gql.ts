import { gql } from '@staff-portal/data-layer-service'

export const TALENT_ENGAGEMENT_RATES_FRAGMENT = gql`
  fragment TalentEngagementRatesFragment on Talent {
    engagements {
      counters {
        workingNumber
        clientsNumber
        repeatedClientsNumber
        acceptedInterviewsNumber
        approvedTrialsNumber
        interviewsNumber
        successRate
        trialsNumber
      }
    }
  }
`
