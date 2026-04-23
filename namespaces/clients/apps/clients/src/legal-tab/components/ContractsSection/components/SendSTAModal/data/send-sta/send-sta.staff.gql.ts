import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { CONTRACT_FRAGMENT } from '../../../../data/contract-fragment'

export const SEND_STA = gql`
  mutation SendSTA($input: SendSTAInput!, $showDescendants: Boolean!) {
    sendSTA(input: $input) {
      client {
        id
        contracts(filter: { showDescendants: $showDescendants }) {
          nodes {
            ...ContractFragment
          }
        }
        operations {
          sendSTA {
            ...OperationFragment
          }
        }
      }
      ...MutationResultFragment
    }
  }
  ${CONTRACT_FRAGMENT}
  ${OPERATION_FRAGMENT}
  ${MUTATION_RESULT_FRAGMENT}
`
