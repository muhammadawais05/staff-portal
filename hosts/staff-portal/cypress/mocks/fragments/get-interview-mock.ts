import { encodeEntityId } from '@staff-portal/data-layer-service'
import {
  Interview,
  InterviewCommunicationType,
  InterviewCumulativeStatus,
  InterviewInitiator,
  InterviewKind,
  InterviewPreferredDurations,
  InterviewStatus,
  InterviewType
} from '@staff-portal/graphql/staff'

import { WithTypename } from '~integration/types'
import { interviewOperationMock } from './interview-operations-mock'
import { timeZoneMock } from './time-zone-mock'

export const getInterviewMock = (
  interview?: Partial<Interview>
): Partial<WithTypename<Interview>> => ({
  __typename: 'Interview',
  id: encodeEntityId('123', 'Interview'),
  status: InterviewStatus.PENDING,
  kind: InterviewKind.EXTERNAL,
  initiator: InterviewInitiator.CANDIDATE,
  initiatorV2: InterviewInitiator.CANDIDATE,
  communication: InterviewCommunicationType.PHONE,
  communicationV2: InterviewCommunicationType.PHONE,
  cumulativeStatus: InterviewCumulativeStatus.OCCURRED,
  schedulingComment: '',
  lockVersion: 4,
  preferredDuration: InterviewPreferredDurations.MINUTES_30,
  interviewTime: '2021-09-11T21:45:00+03:00',
  interviewType: InterviewType.CASE,
  verifierName: 'Jon Snow',
  timeRejectComment: null,
  notReadyFeedback: null,
  meeting: null,
  surveyAnswer: null,
  interviewContactsV3: { totalCount: 0, edges: [], nodes: [] },
  interviewContacts: [],
  availableContacts: {
    nodes: [],
    totalCount: 0
  },
  timeZoneV2: null,
  timeZone: timeZoneMock(),
  timeSlots: null,
  engagement: null,
  webConferenceInfo: { url: null },
  occurred: null,
  bluejeansMeetingHistory: null,
  ratingFacets: [],
  warningLevel: '',
  statusComment: '',
  scheduledAtTimes: [],
  rating: null,
  ratingComment: null,
  ...interview,
  operations: interviewOperationMock(interview?.operations)
})
