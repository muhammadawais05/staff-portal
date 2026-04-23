import { gql, useLazyQuery } from '@staff-portal/data-layer-service'

import { GetFeedbackReasonDocument } from './get-feedback-reason.staff.gql.types'

export default gql`
  query GetFeedbackReason($feedbackId: ID!) {
    node(id: $feedbackId) {
      ... on Feedback {
        id
        reason {
          id
        }
      }
    }
  }
`

export const getLazyFeedbackReasonHook = (feedbackId: string) => () => {
  const [request, { data, loading, error }] = useLazyQuery(
    GetFeedbackReasonDocument,
    {
      variables: { feedbackId }
    }
  )

  return {
    request,
    data: data?.node?.reason.id,
    error,
    loading
  }
}
