import { gql, useQuery } from '@staff-portal/data-layer-service'
import { ONLINE_TESTS_FRAGMENT } from '@staff-portal/talents'

import {
  GetTalentNewOnlineTestAttemptDocument,
  GetTalentNewOnlineTestAttemptQuery
} from './get-talent-new-online-test-attempt.staff.gql.types'

export const GET_TALENT_NEW_ONLINE_TEST_ATTEMPT: typeof GetTalentNewOnlineTestAttemptDocument = gql`
  query GetTalentNewOnlineTestAttempt($onlineTestAttemptId: ID!) {
    node(id: $onlineTestAttemptId) {
      ...CodilityResultFragment
      ...HackerRankResultFragment
    }

    onlineTests {
      nodes {
        ...OnlineTestsFragment
      }
    }
  }

  fragment CodilityResultFragment on CodilityResult {
    id
    trackingRoleSteps(pagination: { limit: 1, offset: 0 }) {
      nodes {
        ...RoleStepFragment
      }
    }
    test {
      id
      name
    }
  }

  fragment HackerRankResultFragment on HackerRankResult {
    id
    trackingRoleSteps(pagination: { limit: 1, offset: 0 }) {
      nodes {
        ...RoleStepFragment
      }
    }
    test {
      id
      name
    }
  }

  fragment RoleStepFragment on RoleStep {
    id
    step {
      id
      title
    }
  }

  ${ONLINE_TESTS_FRAGMENT}
`

export const useGetTalentNewOnlineTestAttempt = ({
  onlineTestAttemptId,
  onCompleted,
  onError
}: {
  onlineTestAttemptId: string
  onCompleted: (data: GetTalentNewOnlineTestAttemptQuery) => void
  onError: (error: Error) => void
}) => {
  const { data, loading } = useQuery(GET_TALENT_NEW_ONLINE_TEST_ATTEMPT, {
    onCompleted,
    onError,
    variables: {
      onlineTestAttemptId
    }
  })

  return {
    data,
    loading
  }
}
