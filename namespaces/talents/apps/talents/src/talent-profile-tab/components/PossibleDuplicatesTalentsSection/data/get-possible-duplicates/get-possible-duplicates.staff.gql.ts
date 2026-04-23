import { gql } from '@staff-portal/data-layer-service'

export const GET_POSSIBLE_DUPLICATES = gql`
  query GetPossibleDuplicates($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        unresolvedPossibleDuplicates {
          nodes {
            ...PossibleTalentDuplicateFragment
          }
        }
        operations {
          markTalentPossibleRoleDuplicatesResolved {
            callable
            messages
          }
        }
      }
    }
  }

  fragment PossibleTalentDuplicateFragment on Talent {
    id
    fullName
  }
`
