import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetClaimEnglishData($roleStepId: ID!) {
    node(id: $roleStepId) {
      ... on RoleStep {
        id
        step {
          id
          title
        }
        talent {
          id
          fullName
          talentPartner {
            id
            fullName
          }
        }
      }
    }
  }
`
