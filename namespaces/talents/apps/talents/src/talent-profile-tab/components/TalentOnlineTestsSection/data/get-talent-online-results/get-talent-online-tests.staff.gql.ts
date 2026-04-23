import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetTalentOnlineTestsDocument } from './get-talent-online-tests.staff.gql.types'

export const GET_TALENT_ONLINE_TESTS: typeof GetTalentOnlineTestsDocument = gql`
  query GetTalentOnlineTests($talentId: ID!) {
    node(id: $talentId) {
      ...TalentOnlineTestsFragment
    }
  }

  fragment TalentOnlineTestsFragment on Talent {
    id
    onlineTestAttempts(
      filter: { scope: ALL }
      order: { field: CREATED_AT, direction: DESC }
    ) {
      nodes {
        ...TalentOnlineTestAttemptFragment
      }
    }
  }

  fragment TalentOnlineTestAttemptFragment on OnlineTestAttempt {
    test {
      __typename
      name
      acceptThreshold
      rejectThreshold
      id
    }
    __typename
    canceledAt
    createdAt
    finishedAt
    id
    maxScore
    pending
    pureScore
    resultUrl
    testUrl
    tracked
    operations {
      ...TalentOnlineTestAttemptOperationsFragment
    }
  }

  fragment TalentOnlineTestAttemptOperationsFragment on OnlineTestAttemptOperations {
    sendNewTestForOnlineTestAttempt {
      callable
      messages
      __typename
    }
    cancelOnlineTestAttempt {
      callable
      messages
      __typename
    }
    trackOnlineTestAttempt {
      callable
      messages
      __typename
    }
    __typename
  }
`

export const useGetTalentOnlineTests = (
  talentId: string,
  {
    onError
  }: {
    onError: () => void
  }
) => {
  const { data, loading, refetch } = useQuery(GET_TALENT_ONLINE_TESTS, {
    onError,
    variables: { talentId },
    fetchPolicy: 'cache-first'
  })

  return {
    data: data?.node,
    loading,
    refetch
  }
}
