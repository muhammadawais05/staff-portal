import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation TouchCounter($counterName: String!, $skipIfMissing: Boolean) {
    touchCounter(
      input: { counterName: $counterName, skipIfMissing: $skipIfMissing }
    ) {
      ...MutationResultFragment
      counter {
        name
        total
        unread
      }
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`
