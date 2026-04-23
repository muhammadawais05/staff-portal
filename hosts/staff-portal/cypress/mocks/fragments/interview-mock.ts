import {
  Client,
  EngagementStatus,
  Interview,
  InterviewCommunicationType,
  InterviewKind,
  InterviewOperations,
  InterviewStatus,
  Job,
  Talent,
  InterviewType,
  InterviewCumulativeStatus,
  InterviewInitiator,
  InterviewContactsConnection,
  InterviewPreferredDurations
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { timeZoneMock } from './time-zone-mock'
import { clientNodeMock } from './client-node-mock'
import { engagementNodeMock } from './engagement-node-mock'
import { interviewOperationMock } from './interview-operations-mock'
import { jobNodeMock } from './job-node-mock'
import { roleOrClientMock } from './role-or-client-mock'
import { talentNodeMock } from './talent-node-mock'

export type Props = {
  interview?: Partial<Interview>
  operations?: Partial<InterviewOperations>
  talent?: Partial<Talent>
}

export const interviewMock = ({
  interview,
  operations,
  talent
}: Props = {}) => {
  const interviewContacts = {
    edges: [
      {
        main: true,
        node: roleOrClientMock({
          id: encodeEntityId('123', 'CompanyRepresentative')
        })
      }
    ],
    __typename: 'InterviewContactsConnection'
  } as unknown as InterviewContactsConnection

  return {
    __typename: 'Interview',
    id: encodeEntityId('123', 'Interview'),
    status: InterviewStatus.PENDING,
    kind: InterviewKind.EXTERNAL,
    initiator: InterviewInitiator.CANDIDATE,
    // TODO: remove all *V2 & *V3, once we migrate all specs to stubs
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
    interviewContacts,
    interviewContactsV3: interviewContacts,
    availableContacts: {
      nodes: [
        roleOrClientMock({
          id: encodeEntityId('123', 'CompanyRepresentative')
        }),
        roleOrClientMock({
          id: encodeEntityId('456', 'Client')
        })
      ],
      totalCount: 2
    },
    operations: interviewOperationMock(operations),
    timeZoneV2: null,
    timeZone: timeZoneMock(),
    timeSlots: [
      { date: '2022-11-02', hours: ['12:00 PM', '12:30 PM'] },
      { date: '2022-11-03', hours: ['11:00 AM', '13:30 PM', '15:30 PM'] }
    ],
    engagement: {
      __typename: 'Engagement',
      id: engagementNodeMock().node().id,
      status: EngagementStatus.PENDING,
      client: {
        ...(clientNodeMock().node() as unknown as Client)
      },
      talent: {
        ...(talentNodeMock(talent).node() as unknown as Talent)
      },
      job: {
        ...(jobNodeMock().node() as unknown as Job)
      },
      ...interview?.engagement
    },
    webConferenceInfo: { url: null },
    occurred: null,
    bluejeansMeetingHistory: null,
    ratingFacets: [],
    warningLevel: '',
    statusComment: '',
    scheduledAtTimes: [],
    rating: null,
    ratingComment: null,
    ...interview
  } as Interview
}
