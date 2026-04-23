import { useMemo } from 'react'
import { gql, useLazyQuery } from '@staff-portal/data-layer-service'

import { GetFeedbackQuestionOptionsDocument } from './get-feedback-question-options.staff.gql.types'

export default gql`
  query GetFeedbackQuestionOptions($feedbackQuestionId: ID!) {
    node(id: $feedbackQuestionId) {
      ... on FeedbackQuestion {
        id
        options {
          nodes {
            id
            value
          }
        }
      }
    }
  }
`

export const getFeedbackQuestionOptionsHook = (
  feedbackQuestionId?: string
) => () => {
  const [request, { data, loading, called, error }] = useLazyQuery(
    GetFeedbackQuestionOptionsDocument,
    {
      variables: { feedbackQuestionId },
      fetchPolicy: 'cache-first'
    }
  )
  const nodes = data?.node?.options?.nodes
  const options = useMemo(
    () =>
      nodes?.map(({ id, value }) => ({
        text: value ?? '',
        value: id
      })) ?? [],
    [nodes]
  )

  return {
    request,
    loading,
    error,
    data: options,
    called
  }
}
