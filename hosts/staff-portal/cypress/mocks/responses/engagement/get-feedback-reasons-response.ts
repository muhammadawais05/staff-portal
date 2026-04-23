import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getFeedbackReasonsResponse = () => ({
  data: {
    feedbackReasons: {
      nodes: [
        {
          id: encodeEntityId('1', 'FeedbackReason'),
          identifier: 'budget_constraints',
          description: 'budget_constraints',
          name: 'Budget constraints',
          group: null,
          __typename: 'FeedbackReason'
        },
        {
          id: encodeEntityId('2', 'FeedbackReason'),
          identifier: 'hired_someone_locally',
          description: 'hired_someone_locally',
          name: 'Hiring someone else locally',
          group: {
            id: encodeEntityId('1', 'FeedbackReason'),
            name: 'Budget constraints',
            __typename: 'FeedbackReason'
          },
          __typename: 'FeedbackReason'
        },
        {
          id: encodeEntityId('3', 'FeedbackReason'),
          identifier: 'other',
          description: 'other',
          name: 'Other',
          group: null,
          __typename: 'FeedbackReason'
        }
      ],
      __typename: 'FeedbackReasonConnection'
    }
  }
})
