import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetTalentProfileTabPermissions($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        commentsAccessible
      }
    }
  }
`
