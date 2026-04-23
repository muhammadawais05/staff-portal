import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation SetOpportunitySdr($input: UpdateOpportunitySdrInput!) {
    updateOpportunitySdr(input: $input) {
      opportunity {
        id
        sdr {
          ...StaffUserFragment
        }
      }
      ...MutationResultFragment
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`
