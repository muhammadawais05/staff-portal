import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export const CREATE_TOP_SHIELD_APPLICATION_QUARTER = gql`
  mutation CreateTopShieldApplicationQuarter(
    $input: CreateTopShieldApplicationQuarterInput!
  ) {
    createTopShieldApplicationQuarter(input: $input) {
      ...MutationResultFragment
      topShieldApplication {
        id
        quarters {
          nodes {
            id
          }
        }
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`
