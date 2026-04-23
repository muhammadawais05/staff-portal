import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { OPERATIONAL_ISSUE_ACTION_FRAGMENT } from '../../../../data/operational-issue-fragment/operational-issue-fragment.staff.gql'
import {
  VerifyOperationalIssueDocument,
  VerifyOperationalIssueMutation
} from './verify-operational-issue.staff.gql.types'

export default gql`
  mutation VerifyOperationalIssue($operationalIssueId: ID!) {
    verifyOperationalIssue(input: { operationalIssueId: $operationalIssueId }) {
      ...MutationResultFragment
      operationalIssue {
        ...OperationalIssueActionFragment
      }
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
  ${OPERATIONAL_ISSUE_ACTION_FRAGMENT}
`

export const useVerifyOperationalIssue = ({
  onCompleted,
  onError
}: {
  onCompleted: (data: VerifyOperationalIssueMutation) => void
  onError: (error: Error) => void
}) =>
  useMutation(VerifyOperationalIssueDocument, {
    onCompleted,
    onError
  })
