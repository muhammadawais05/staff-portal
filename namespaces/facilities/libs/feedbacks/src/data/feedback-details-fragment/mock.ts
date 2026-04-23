import {
  FeedbackStatus,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'

import { FeedbackDetailsFragment } from './feedback-details-fragment.staff.gql.types'

const OPERATION = { callable: OperationCallableTypes.ENABLED, messages: [] }

export const createFeedbackMock = (
  feedback: Partial<FeedbackDetailsFragment> = {}
): FeedbackDetailsFragment =>
  ({
    id: 'VjEtRmVlZGJhY2stMjAzNzg1',
    comment: 'Some Comment',
    createdAt: '2021-06-15T00:00:00+00:00',
    operations: {
      markOutdatedFeedback: OPERATION,
      updateFeedbackComment: OPERATION,
      updateFeedbackReason: OPERATION,
      createFeedbackClientAnswers: OPERATION,
      createFeedbackMatcherAnswers: OPERATION
    },
    reason: {
      id: 'reason-id',
      name: 'Reason Name'
    },
    status: FeedbackStatus.ACTIVE,
    ...feedback
  } as const)
