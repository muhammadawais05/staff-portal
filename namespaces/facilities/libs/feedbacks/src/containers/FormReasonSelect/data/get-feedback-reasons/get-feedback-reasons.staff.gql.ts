import { FeedbackReasonActions } from '@staff-portal/graphql/staff'
import { gql, useLazyQuery, useQuery } from '@staff-portal/data-layer-service'

import { GetFeedbackReasonsDocument } from './get-feedback-reasons.staff.gql.types'
import { useFeedbackReasonsOptions } from '../../hooks/use-feedback-reasons-options'

export default gql`
  fragment FeedbackReasonFragment on FeedbackReason {
    id
    identifier
    name
    description
    group {
      id
      name
    }
  }

  query GetFeedbackReasons($action: FeedbackReasonActions!) {
    feedbackReasons(filter: { action: $action }) {
      nodes {
        ...FeedbackReasonFragment
      }
    }
  }
`

export const useGetFeedbackReasons = (action: FeedbackReasonActions) => {
  const { data, loading, error } = useQuery(GetFeedbackReasonsDocument, {
    variables: { action }
  })

  return {
    data: data?.feedbackReasons.nodes,
    loading,
    error
  }
}

export const getFeedbackReasonOptionsHook =
  (action: FeedbackReasonActions, grouped?: boolean) => () => {
    const [request, { data, loading, called, error }] = useLazyQuery(
      GetFeedbackReasonsDocument,
      { variables: { action } }
    )

    const feedbackReasons = data?.feedbackReasons.nodes
    const options = useFeedbackReasonsOptions(
      feedbackReasons,
      action !== FeedbackReasonActions.ENGAGEMENT_ENDED && grouped
    )

    return {
      request,
      data: options,
      error,
      loading,
      called
    }
  }
