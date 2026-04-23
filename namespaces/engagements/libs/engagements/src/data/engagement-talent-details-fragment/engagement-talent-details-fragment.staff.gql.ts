import { gql } from '@staff-portal/data-layer-service'

import { ENGAGEMENT_CLIENT_IN_TALENT_SECTION_FRAGMENT } from '../engagement-client-in-talent-section-fragment'

export const ENGAGEMENT_TALENT_DETAILS_FRAGMENT = gql`
  fragment EngagementTalentDetailsFragment on Engagement {
    startDate
    trialLength
    client {
      ...EngagementClientInTalentSectionFragment
    }
    discountMultiplier
    commitment
    billCycle
    extraHoursEnabled
    commitmentSettings {
      id
      minimumHours
    }
    commitmentAtStartDate {
      availability
      canBeDiscounted
      adjustedCompanyRate {
        availability
        value
      }
      adjustedRevenueRate {
        availability
        value
      }
      adjustedTalentRate {
        availability
        value
      }
    }
    currentCommitment {
      availability
      canBeDiscounted
      adjustedCompanyRate {
        availability
        value
        hourlyHint {
          value
        }
      }
      adjustedRevenueRate {
        availability
        value
        hourlyHint {
          value
        }
      }
      adjustedTalentRate {
        availability
        value
        hourlyHint {
          value
        }
      }
    }
  }

  ${ENGAGEMENT_CLIENT_IN_TALENT_SECTION_FRAGMENT}
`
