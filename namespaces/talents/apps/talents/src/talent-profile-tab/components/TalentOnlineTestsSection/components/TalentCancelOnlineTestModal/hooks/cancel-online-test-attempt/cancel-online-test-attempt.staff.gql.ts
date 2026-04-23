import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  CancelOnlineTestAttemptDocument,
  CancelOnlineTestAttemptMutation
} from './cancel-online-test-attempt.staff.gql.types'
import { GET_TALENT_ONLINE_TESTS } from '../../../../data/get-talent-online-results'

export const CANCEL_ONLINE_TEST_ATTEMPT: typeof CancelOnlineTestAttemptDocument = gql`
  mutation CancelOnlineTestAttempt($input: CancelOnlineTestAttemptInput!) {
    cancelOnlineTestAttempt(input: $input) {
      ...MutationResultFragment
      onlineTestAttempt {
        id
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useCancelOnlineTestAttempt = ({
  onCompleted,
  onError,
  talentId
}: {
  onCompleted: (data: CancelOnlineTestAttemptMutation) => void
  onError: (error: Error) => void
  talentId: string
}) =>
  useMutation(CANCEL_ONLINE_TEST_ATTEMPT, {
    onCompleted,
    onError,

    refetchQueries: [
      {
        query: GET_TALENT_ONLINE_TESTS,
        variables: { talentId }
      }
    ]
  })
