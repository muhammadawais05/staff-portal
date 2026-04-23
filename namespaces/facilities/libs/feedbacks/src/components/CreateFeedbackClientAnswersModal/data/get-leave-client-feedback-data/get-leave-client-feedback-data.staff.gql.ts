import { gql, useQuery } from '@staff-portal/data-layer-service'

import { FEEDBACK_QUESTION_EDGE_FRAGMENT } from '../../../../data'
import {
  GetLeaveClientFeedbackDataDocument,
  GetLeaveClientFeedbackDataQuery
} from './get-leave-client-feedback-data.staff.gql.types'

export const GET_LEAVE_CLIENT_FEEDBACK_DATA = gql`
  query GetLeaveClientFeedbackData($feedbackId: ID!) {
    node(id: $feedbackId) {
      ... on Feedback {
        id
        clientUrl
        clientQuestions {
          edges {
            ...FeedbackQuestionEdgeFragment
          }
        }
      }
    }
  }

  ${FEEDBACK_QUESTION_EDGE_FRAGMENT}
`

export const useGetLeaveClientFeedbackData = ({
  feedbackId,
  onCompleted,
  onError
}: {
  feedbackId: string
  onCompleted: (data: GetLeaveClientFeedbackDataQuery) => void
  onError: (error: Error) => void
}) =>
  useQuery(GetLeaveClientFeedbackDataDocument, {
    variables: { feedbackId },
    onCompleted,
    onError
  })
