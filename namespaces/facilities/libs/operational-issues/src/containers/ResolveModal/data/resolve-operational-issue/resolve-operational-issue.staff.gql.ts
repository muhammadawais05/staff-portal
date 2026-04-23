import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { GET_OPERATIONAL_ISSUES } from '../../../../data/get-operational-issues/get-operational-issues.staff.gql'
import { ResolveOperationalIssueDocument } from './resolve-operational-issue.staff.gql.types'

export default gql`
  mutation ResolveOperationalIssue($input: ResolveOperationalIssueInput!) {
    resolveOperationalIssue(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useResolveOperationalIssue = ({
  onError
}: {
  onError: (error: Error) => void
}) =>
  useMutation(ResolveOperationalIssueDocument, {
    onError,
    refetchQueries: [
      {
        query: GET_OPERATIONAL_ISSUES
      }
    ]
  })
