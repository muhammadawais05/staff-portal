import { gql, useQuery } from '@staff-portal/data-layer-service'

import { FEEDBACK_QUESTION_EDGE_FRAGMENT } from '../../../../data'
import {
  GetLeaveMatcherFeedbackDataDocument,
  GetLeaveMatcherFeedbackDataQuery
} from './get-leave-matcher-feedback-data.staff.gql.types'

export const GET_LEAVE_MATCHER_FEEDBACK_DATA = gql`
  query GetLeaveMatcherFeedbackData($feedbackId: ID!) {
    node(id: $feedbackId) {
      ... on Feedback {
        id
        matcherQuestions {
          edges {
            ...FeedbackQuestionEdgeFragment
          }
        }
      }
    }
  }

  ${FEEDBACK_QUESTION_EDGE_FRAGMENT}
`

export const useGetLeaveMatcherFeedbackData = ({
  feedbackId,
  onCompleted,
  onError
}: {
  feedbackId: string
  onCompleted: (data: GetLeaveMatcherFeedbackDataQuery) => void
  onError: (error: Error) => void
}) =>
  useQuery(GetLeaveMatcherFeedbackDataDocument, {
    variables: { feedbackId },
    onCompleted,
    onError
  })
