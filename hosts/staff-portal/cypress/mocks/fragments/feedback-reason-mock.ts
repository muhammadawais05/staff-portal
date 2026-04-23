import { FeedbackReason } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const feedbackReasonMock = (
  reason?: Partial<FeedbackReason>
): FeedbackReason =>
  ({
    id: encodeEntityId('123', 'FeedbackReason'),
    name: 'Budget constraints',
    action: {
      id: encodeEntityId('123', 'FeedbackAction'),
      identifier: 'engagement_ended',
      name: 'Engagement Ended'
    },
    ...reason
  } as FeedbackReason)
