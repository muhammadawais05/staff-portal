import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  TrackOnlineTestAttemptDocument,
  TrackOnlineTestAttemptMutation
} from './track-online-test-attempt.staff.gql.types'
import { GET_TALENT_ONLINE_TESTS } from '../../../../data/get-talent-online-results'

export const TRACK_ONLINE_TEST_ATTEMPT: typeof TrackOnlineTestAttemptDocument = gql`
  mutation TrackOnlineTestAttempt($input: TrackOnlineTestAttemptInput!) {
    trackOnlineTestAttempt(input: $input) {
      ...MutationResultFragment
      onlineTestAttempt {
        id
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useTrackOnlineTestAttempt = ({
  onCompleted,
  onError,
  talentId
}: {
  onCompleted?: (data: TrackOnlineTestAttemptMutation) => void
  onError: (error: Error) => void
  talentId: string
}) =>
  useMutation(TRACK_ONLINE_TEST_ATTEMPT, {
    onCompleted,
    onError,
    refetchQueries: [
      {
        query: GET_TALENT_ONLINE_TESTS,
        variables: {
          talentId
        }
      }
    ]
  })
