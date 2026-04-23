import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { OPERATIONAL_ISSUE_ACTION_FRAGMENT } from '../../../../data/operational-issue-fragment/operational-issue-fragment.staff.gql'
import {
  ClaimOperationalIssueDocument,
  ClaimOperationalIssueMutation
} from './claim-operational-issue.staff.gql.types'

export default gql`
  mutation ClaimOperationalIssue($input: ClaimOperationalIssueInput!) {
    claimOperationalIssue(input: $input) {
      ...MutationResultFragment
      operationalIssue {
        ...OperationalIssueActionFragment
      }
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
  ${OPERATIONAL_ISSUE_ACTION_FRAGMENT}
`

export const useClaimOperationalIssue = ({
  onCompleted,
  onError
}: {
  onCompleted: (data: ClaimOperationalIssueMutation) => void
  onError: (error: Error) => void
}) => useMutation(ClaimOperationalIssueDocument, { onCompleted, onError })
