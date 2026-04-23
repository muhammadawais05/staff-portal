import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation CreateGigReachOut($input: CreateGigReachOutInput!) {
    createGigReachOut(input: $input) {
      clientMutationId
      notice
      reachOut {
        ...GigReachOutFragment
      }
      ...MutationResultFragment
    }
  }

  fragment GigReachOutFragment on GigReachOut {
    id
    status
  }

  ${MUTATION_RESULT_FRAGMENT}
`
