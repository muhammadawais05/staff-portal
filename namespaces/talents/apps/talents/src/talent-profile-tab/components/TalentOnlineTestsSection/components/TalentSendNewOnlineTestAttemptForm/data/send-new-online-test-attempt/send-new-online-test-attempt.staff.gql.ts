import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  SendNewTestForOnlineTestAttemptDocument,
  SendNewTestForOnlineTestAttemptMutation
} from './send-new-online-test-attempt.staff.gql.types'
import { GET_TALENT_ONLINE_TESTS } from '../../../../data/get-talent-online-results'

export const SEND_NEW_ONLINE_TEST_ATTEMPT: typeof SendNewTestForOnlineTestAttemptDocument = gql`
  mutation SendNewTestForOnlineTestAttempt(
    $input: SendNewTestForOnlineTestAttemptInput!
  ) {
    sendNewTestForOnlineTestAttempt(input: $input) {
      ...MutationResultFragment
      onlineTestAttempt {
        id
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useSendNewTestForOnlineTestAttempt = ({
  onCompleted,
  onError,
  talentId
}: {
  onCompleted?: (data: SendNewTestForOnlineTestAttemptMutation) => void
  onError: (error: Error) => void
  talentId: string
}) =>
  useMutation(SEND_NEW_ONLINE_TEST_ATTEMPT, {
    onCompleted,
    onError,
    refetchQueries: [
      {
        query: GET_TALENT_ONLINE_TESTS,
        variables: { talentId }
      }
    ]
  })
