import { gql } from '@staff-portal/data-layer-service'
import { TALENT_PROFILE_FRAGMENT } from '@staff-portal/talents-card-builder'

export default gql`
  query GetProfileData($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        ...TalentProfileFragment
      }
    }
  }

  ${TALENT_PROFILE_FRAGMENT}
`
