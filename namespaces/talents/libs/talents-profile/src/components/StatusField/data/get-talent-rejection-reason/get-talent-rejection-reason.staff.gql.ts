import { gql } from '@staff-portal/data-layer-service'

import { SPECIALIZATION_APPLICATION_FRAGMENT } from '../specialization-application-fragment/specialization-application-fragment.staff.gql'

export default gql`
  query GetTalentRejectionReason($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        specializationApplications {
          nodes {
            ...SpecializationApplicationFragment
          }
        }
      }
    }
  }
  ${SPECIALIZATION_APPLICATION_FRAGMENT}
`
