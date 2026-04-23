import { gql, useGetNode } from '@staff-portal/data-layer-service'
import { TALENT_AVAILABILITY_FRAGMENT } from '@staff-portal/talents'

import { TOP_SHIELD_APPLICATION_FRAGMENT } from '../top-shield-application-fragment/top-shield-application-fragment.staff.gql'
import { GetTalentTopShieldDocument } from './get-talent-top-shield.staff.gql.types'

export const GET_TALENT_TOP_SHIELD = gql`
  query GetTalentTopShield(
    $talentId: ID!
    $loadDisputeOperations: Boolean!
    $isForEdit: Boolean!
  ) {
    node(id: $talentId) {
      ...TalentTopShieldFragment
    }
  }

  fragment TalentTopShieldFragment on Talent {
    id
    fullName
    ...TalentAvailabilityFragment
    workingPeriods {
      nodes {
        start
        activeEngagements {
          edges {
            workingHours
            node {
              id
            }
          }
        }
      }
    }
    engagements(filter: { status: WORKING }) {
      nodes {
        ...TalentTopShieldEngagement
      }
    }
    topShieldApplication {
      ...TopShieldApplicationFragment
    }
  }

  fragment TalentTopShieldEngagement on Engagement {
    id
    startDate
    job {
      title
      estimatedEndDate
    }
    engagementBreaks(filter: { statuses: SCHEDULED }) {
      nodes {
        startDate
        endDate
      }
    }
  }

  ${TOP_SHIELD_APPLICATION_FRAGMENT}
  ${TALENT_AVAILABILITY_FRAGMENT}
`

export const useGetTalentTopShield = (talentId: string, isForEdit = false) =>
  useGetNode(GetTalentTopShieldDocument)({
    talentId,
    loadDisputeOperations: true,
    isForEdit
  })
