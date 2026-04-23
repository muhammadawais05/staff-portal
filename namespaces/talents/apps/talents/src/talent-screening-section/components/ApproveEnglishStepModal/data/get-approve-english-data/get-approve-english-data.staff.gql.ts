import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetApproveEnglishData($roleStepId: ID!) {
    node(id: $roleStepId) {
      ... on RoleStep {
        id
        englishApprovalRequiresSpecialization
        claimer {
          id
          fullName
        }
        talent {
          id
          applicantSkills {
            nodes {
              id
              name
            }
          }
          vertical {
            id
            specializations {
              nodes {
                id
                title
              }
            }
          }
        }
      }
    }
  }
`
