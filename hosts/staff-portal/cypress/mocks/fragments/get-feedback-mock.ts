import { encodeEntityId } from '@staff-portal/data-layer-service'
import {
  Feedback,
  FeedbackAction,
  FeedbackOperations,
  FeedbackReason,
  FeedbackStatus,
  Link,
  Staff
} from '@staff-portal/graphql/staff'

import { WithTypename } from '~integration/types'
import { enabledOperationMock } from '../enabled-operation-mock'

export const getFeedbackMock = (
  feedback?: Partial<Feedback> | null
): Partial<WithTypename<Feedback>> => ({
  __typename: 'Feedback',
  id: encodeEntityId('123', 'Feedback'),
  createdAt: '2021-07-07T23:34:11+03:00',
  status: FeedbackStatus.ACTIVE,
  outdatedComment: null,
  comment: 'This part was obfuscated, some content was here.',
  targetPeriodSingleDay: null,
  targetPeriodStartDate: null,
  targetPeriodEndDate: null,
  performer: {
    __typename: 'Staff',
    id: 'VjEtU3RhZmYtMTcwMDM3MA',
    webResource: {
      text: 'Alex Sevilla',
      url: 'https://staging.toptal.net/platform/staff/staff/1700370',
      __typename: 'Link'
    } as Link,
    ...feedback?.performer
  } as WithTypename<Staff>,
  reason: {
    id: 'VjEtRmVlZGJhY2tSZWFzb24tODY',
    name: 'My internal roadmap/priority is changing',
    action: {
      id: 'VjEtRmVlZGJhY2tBY3Rpb24tNg',
      name: 'Engagement Ended',
      shortName: null,
      identifier: 'engagement_ended',
      __typename: 'FeedbackAction',
      ...feedback?.reason?.action
    } as FeedbackAction,
    __typename: 'FeedbackReason',
    ...feedback?.reason
  } as FeedbackReason,
  task: null,
  operations: {
    updateFeedbackComment: enabledOperationMock(),
    updateFeedbackReason: enabledOperationMock(),
    markOutdatedFeedback: enabledOperationMock(),
    createFeedbackClientAnswers: enabledOperationMock(),
    createFeedbackMatcherAnswers: enabledOperationMock(),
    __typename: 'FeedbackOperations'
  } as FeedbackOperations,
  additionalQuestions: true,
  clientQuestions: {
    totalCount: 0,
    nodes: [],
    edges: []
  },
  matcherQuestions: {
    totalCount: 0,
    nodes: [],
    edges: []
  },
  clientAnswers: {
    totalCount: 0,
    nodes: []
  },
  matcherAnswers: {
    totalCount: 0,
    nodes: []
  },
  talentAnswers: {
    totalCount: 0,
    nodes: []
  },
  ...feedback
})
