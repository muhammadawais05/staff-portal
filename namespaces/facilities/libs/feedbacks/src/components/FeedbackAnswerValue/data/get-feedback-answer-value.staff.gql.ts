import { gql, useLazyQuery } from '@staff-portal/data-layer-service'

import { GetFeedbackAnswerValueDocument } from './get-feedback-answer-value.staff.gql.types'

export default gql`
  query GetFeedbackAnswerValue($feedbackAnswerId: ID!) {
    node(id: $feedbackAnswerId) {
      ... on FeedbackAnswer {
        id
        option {
          id
        }
      }
    }
  }
`

export const getLazyFeedbackAnswerValueHook = (
  feedbackAnswerId: string
) => () => {
  const [request, { data, loading, error }] = useLazyQuery(
    GetFeedbackAnswerValueDocument,
    {
      variables: { feedbackAnswerId }
    }
  )

  return {
    request,
    data: data?.node?.option?.id,
    error,
    loading
  }
}
