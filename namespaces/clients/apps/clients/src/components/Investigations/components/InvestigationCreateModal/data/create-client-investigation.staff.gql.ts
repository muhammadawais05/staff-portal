import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export const SET_CREATE_CLIENT_INVESTIGATION = gql`
  mutation SetCreateClientInvestigation(
    $input: CreateClientInvestigationInput!
  ) {
    createClientInvestigation(input: $input) {
      client {
        id
        investigations {
          totalCount
        }
        operations {
          createClientInvestigation {
            ...OperationFragment
          }
        }
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
  ${OPERATION_FRAGMENT}
`
