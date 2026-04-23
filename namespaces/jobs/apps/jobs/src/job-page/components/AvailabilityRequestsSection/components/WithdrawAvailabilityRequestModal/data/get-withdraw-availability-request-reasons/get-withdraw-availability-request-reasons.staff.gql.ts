import { FeedbackReasonActions } from '@staff-portal/graphql/staff'
import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetWithdrawAvailabilityRequestReasonsDocument } from './get-withdraw-availability-request-reasons.staff.gql.types'

export const GET_WITHDRAW_FEEDBACK_REASONS: typeof GetWithdrawAvailabilityRequestReasonsDocument = gql`
  query GetWithdrawAvailabilityRequestReasons($action: FeedbackReasonActions!) {
    feedbackReasons(filter: { action: $action }) {
      nodes {
        ...WithdrawFeedbackReasonFragment
      }
    }
  }

  fragment WithdrawFeedbackReasonFragment on FeedbackReason {
    id
    identifier
    nameForRole
    defaultComment
  }
`

export const useGetWithdrawAvailabilityRequestReasons = () => {
  const { data, loading, error } = useQuery(GET_WITHDRAW_FEEDBACK_REASONS, {
    variables: { action: FeedbackReasonActions.AVAILABILITY_REQUEST_WITHDRAWN }
  })

  return {
    reasons: data?.feedbackReasons.nodes,
    loading,
    error
  }
}
