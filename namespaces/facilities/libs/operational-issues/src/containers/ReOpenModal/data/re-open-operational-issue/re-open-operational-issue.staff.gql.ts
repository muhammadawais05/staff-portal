import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { GET_OPERATIONAL_ISSUES } from '../../../../data/get-operational-issues/get-operational-issues.staff.gql'
import { ReOpenOperationalIssueDocument } from './re-open-operational-issue.staff.gql.types'

export default gql`
  mutation ReOpenOperationalIssue($input: ReopenOperationalIssueInput!) {
    reopenOperationalIssue(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useReOpenOperationalIssue = ({
  onError
}: {
  onError: (error: Error) => void
}) =>
  useMutation(ReOpenOperationalIssueDocument, {
    onError,
    refetchQueries: [
      {
        query: GET_OPERATIONAL_ISSUES
      }
    ]
  })
