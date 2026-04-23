import { gql } from '@staff-portal/data-layer-service'
import { WEB_RESOURCE_FRAGMENT } from '@staff-portal/facilities'
import { TALENT_PARTNER_FRAGMENT } from '@staff-portal/talents'

export const TALENT_FOR_COACHING_ENGAGEMENT_FRAGMENT = gql`
  fragment TalentForCoachingEngagementFragment on Talent {
    id
    fullName
    activatedAt
    photo {
      small
    }
    hourlyRate
    engagements {
      counters {
        workingNumber
      }
    }
    timeZone {
      name
    }
    locationV2 {
      countryName
    }
    talentType
    ...TalentPartnerFragment
    ...WebResourceFragment
  }

  ${WEB_RESOURCE_FRAGMENT}
  ${TALENT_PARTNER_FRAGMENT}
`
