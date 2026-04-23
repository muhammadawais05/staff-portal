import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  ResolvePossibleDuplicatesDocument,
  ResolvePossibleDuplicatesMutation
} from './resolve-possible-duplicates.staff.gql.types'
import { GET_POSSIBLE_DUPLICATES } from '../get-possible-duplicates'
import { GET_TALENT_STATUS_MESSAGES } from '../../../../../talent-page/components/SetHealthStatusModal/data/get-talent-status-messages.staff.gql'

export const RESOLVE_POSSIBLE_DUPLICATES: typeof ResolvePossibleDuplicatesDocument = gql`
  mutation ResolvePossibleDuplicates($talentId: ID!) {
    markTalentPossibleRoleDuplicatesResolved(input: { talentId: $talentId }) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useResolvePossibleDuplicates = ({
  talentId,
  onError,
  onCompleted
}: {
  talentId: string
  onError: () => void
  onCompleted: (data: ResolvePossibleDuplicatesMutation) => void
}) =>
  useMutation(RESOLVE_POSSIBLE_DUPLICATES, {
    onError,
    onCompleted,
    variables: { talentId },
    refetchQueries: [
      { query: GET_POSSIBLE_DUPLICATES, variables: { talentId } },
      { query: GET_TALENT_STATUS_MESSAGES, variables: { talentId } }
    ]
  })
