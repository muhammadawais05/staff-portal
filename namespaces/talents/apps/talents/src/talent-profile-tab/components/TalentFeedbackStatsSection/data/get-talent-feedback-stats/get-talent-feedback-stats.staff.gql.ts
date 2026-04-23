import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetTalentFeedbackStatsDocument } from './get-talent-feedback-stats.staff.gql.types'

export const GET_TALENT_FEEDBACK_STATS: typeof GetTalentFeedbackStatsDocument = gql`
  query GetTalentFeedbackStats($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        feedbackStatistics {
          nodes {
            ...FeedbackStatsEntry
          }
        }
      }
    }
  }

  fragment FeedbackStatsEntry on FeedbackStatisticEntry {
    roleTitle
    answers {
      nodes {
        ...FeedbackStatsAnswerEntry
      }
      totalCount
    }
  }

  fragment FeedbackStatsAnswerEntry on FeedbackStatisticAnswerEntry {
    label
    tooltip
    score
  }
`

const useGetTalentProfileGeneralData = ({
  talentId,
  onError
}: {
  talentId: string
  onError: () => void
}) => {
  const { data, loading, refetch } = useQuery(GET_TALENT_FEEDBACK_STATS, {
    onError,
    variables: { talentId },
    fetchPolicy: 'cache-first'
  })

  return {
    loading,
    refetch,
    data: data?.node?.feedbackStatistics?.nodes
  }
}

export default useGetTalentProfileGeneralData
