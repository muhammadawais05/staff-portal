import { gql, useQuery } from '@staff-portal/data-layer-service'

import {
  GetTrackOnlineTestAttemptDocument,
  GetTrackOnlineTestAttemptQuery
} from './get-track-online-test-attempt.staff.gql.types'

export const GET_TRACK_ONLINE_TEST_ATTEMPT: typeof GetTrackOnlineTestAttemptDocument = gql`
  query GetTrackOnlineTestAttempt($talentId: ID!, $onlineTestId: ID!) {
    talent: node(id: $talentId) {
      ... on Talent {
        id
        roleSteps(
          filter: { stepTypes: ["online_test"], statuses: [CLAIMED] }
          pagination: { limit: 1, offset: 0 }
        ) {
          nodes {
            id
            onlineTestAttempt {
              id
              test {
                id
                name
              }
            }
            step {
              id
              title
            }
          }
        }
      }
    }

    subject: node(id: $onlineTestId) {
      ... on CodilityResult {
        id
        test {
          id
          name
        }
      }
      ... on HackerRankResult {
        id
        test {
          id
          name
        }
      }
    }
  }
`

export const useGetTrackOnlineTestAttempt = ({
  talentId,
  onlineTestId,
  onCompleted,
  onError
}: {
  talentId: string
  onlineTestId: string
  onCompleted: (data: GetTrackOnlineTestAttemptQuery) => void
  onError: (error: Error) => void
}) =>
  useQuery(GET_TRACK_ONLINE_TEST_ATTEMPT, {
    onCompleted,
    onError,
    variables: {
      talentId,
      onlineTestId
    }
  })
