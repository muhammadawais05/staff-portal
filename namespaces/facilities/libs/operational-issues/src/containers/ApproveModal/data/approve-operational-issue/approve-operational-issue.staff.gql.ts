import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { GET_OPERATIONAL_ISSUES } from '../../../../data/get-operational-issues/get-operational-issues.staff.gql'
import { ApproveOperationalIssueDocument } from './approve-operational-issue.staff.gql.types'

export default gql`
  mutation ApproveOperationalIssue($operationalIssueId: ID!, $comment: String) {
    approveOperationalIssue(
      input: { operationalIssueId: $operationalIssueId, comment: $comment }
    ) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useApproveOperationalIssue = () =>
  useMutation(ApproveOperationalIssueDocument, {
    refetchQueries: [{ query: GET_OPERATIONAL_ISSUES }]
  })
