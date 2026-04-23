import { gql } from '@staff-portal/data-layer-service'

export const MUTATION_RESULT_FRAGMENT = gql`
  fragment MutationResultFragment on MutationResult {
    success
    errors {
      code
      key
      message
    }
  }
`
