import { gql } from '@staff-portal/data-layer-service'

export const TALENT_TRIAL_RATE_FRAGMENT = gql`
  fragment TalentTrialRateFragment on Talent {
    id
    engagements {
      counters {
        trialSuccessRate
        successfulTrialsNumber
        rejectedTrialsNumber
      }
    }
  }
`
