import { FeedbackReasonActions } from '@staff-portal/graphql/staff'

import { GetFeedbackReasonsDocument } from './get-feedback-reasons.staff.gql.types'

export const createGetFeedbackReasonsMock = ({
  action,
  length
}: {
  action: FeedbackReasonActions
  length: number
}) => ({
  request: {
    query: GetFeedbackReasonsDocument,
    variables: {
      action
    }
  },
  result: {
    data: {
      feedbackReasons: {
        nodes: Array.from({ length }).map((_, index) => ({
          id: `${index}`,
          description: null,
          identifier: `reason-${index}`,
          name: `Reason ${index}`,
          group: null,
          __typename: 'FeedbackReason'
        })),
        __typename: 'FeedbackReasonConnection'
      }
    }
  }
})

export const createGetUserAutocompleteFailedMock = ({
  action
}: {
  action: FeedbackReasonActions
}) => ({
  request: {
    query: GetFeedbackReasonsDocument,
    variables: {
      action
    }
  },
  error: new Error('Mock error message')
})
