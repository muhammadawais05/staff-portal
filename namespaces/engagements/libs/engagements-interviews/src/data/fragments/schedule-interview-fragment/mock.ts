import {
  InterviewCommunicationType,
  InterviewInitiator,
  InterviewKind,
  InterviewType
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { createRoleOrClientFragment } from '@staff-portal/facilities/src/mocks'

import { ScheduleInterviewFragment } from './schedule-interview-fragment.staff.gql.types'

export const createScheduleInterviewFragmentMock = (
  scheduleInterview: Partial<ScheduleInterviewFragment> = {}
): ScheduleInterviewFragment => ({
  id: 'interview-id',
  initiator: InterviewInitiator.CANDIDATE,
  interviewType: InterviewType.GENERAL,
  kind: InterviewKind.INTERNAL,
  communication: InterviewCommunicationType.PHONE,
  lockVersion: 1,
  availableContacts: {
    nodes: [
      createRoleOrClientFragment({
        id: encodeEntityId('123', 'CompanyRepresentative')
      }),
      createRoleOrClientFragment({
        id: encodeEntityId('456', 'Client')
      })
    ]
  },
  interviewContacts: {
    edges: [
      {
        main: true,
        node: createRoleOrClientFragment({
          id: encodeEntityId('123', 'CompanyRepresentative')
        })
      }
    ]
  },
  timeZone: {
    name: '(UTC+03:00) Asia - Kuwait',
    value: 'Asia/Kuwait'
  },
  ...scheduleInterview
})
