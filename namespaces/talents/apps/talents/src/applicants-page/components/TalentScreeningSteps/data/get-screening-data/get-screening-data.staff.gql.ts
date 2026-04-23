import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetTalentScreeningData($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        screeningRoleSteps {
          nodes {
            id
            status
            claimer {
              id
            }
            mainAction {
              actionName
              status
              tooltip
            }
            step {
              id
              title
            }
          }
        }
      }
    }
  }
`
