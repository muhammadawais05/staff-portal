import { Feedback, FeedbackStatus } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { feedbackOperationsMock } from './feedback-operations-mock'
import { feedbackReasonMock } from './feedback-reason-mock'

export type FeedbackMockProps = {
  feedback: Partial<Feedback>
}

export const feedbackMock = (feedback?: Partial<Feedback>): Feedback =>
  ({
    __typename: 'Feedback',
    id: encodeEntityId('123', 'Feedback'),
    additionalQuestions: false,
    createdAt: '2021-09-24T08:45:00-04:00',
    status: FeedbackStatus.ACTIVE,
    outdatedComment: '',
    comment: '',
    reason: feedbackReasonMock(),
    clientUrl: 'https://example.com',
    targetPeriodSingleDay: null,
    targetPeriodStartDate: null,
    targetPeriodEndDate: null,
    task: null,
    performer: null,
    operations: feedbackOperationsMock(),
    clientQuestions: { nodes: [], edges: [] },
    matcherQuestions: { nodes: [], edges: [] },
    clientAnswers: { nodes: [] },
    matcherAnswers: { nodes: [] },
    talentAnswers: { nodes: [] },
    ...feedback
  } as Feedback)
