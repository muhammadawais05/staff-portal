import { gql, useLazyQuery } from '@staff-portal/data-layer-service'

import { GetFeedbackCommentDocument } from './get-feedback-details-comment.staff.gql.types'

export default gql`
  query GetFeedbackComment($feedbackId: ID!) {
    node(id: $feedbackId) {
      ... on Feedback {
        id
        comment
      }
    }
  }
`

export const getLazyFeedbackCommentHook = (feedbackId: string) => () => {
  const [request, { data, loading, error }] = useLazyQuery(
    GetFeedbackCommentDocument,
    {
      variables: { feedbackId }
    }
  )

  return {
    request,
    data: data?.node?.comment,
    error,
    loading
  }
}
