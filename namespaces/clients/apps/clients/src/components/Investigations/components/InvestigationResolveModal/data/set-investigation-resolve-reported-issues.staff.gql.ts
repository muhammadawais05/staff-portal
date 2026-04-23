import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation SetResolveClientReportedIssuesInvestigation(
    $input: ResolveClientReportedIssuesInvestigationInput!
  ) {
    resolveClientReportedIssuesInvestigation(input: $input) {
      client {
        id
        investigations {
          totalCount
        }
        operations {
          resolveClientReportedIssuesInvestigation {
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
