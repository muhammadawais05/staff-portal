import {
  InterviewCommunicationType,
  InterviewInitiator,
  InterviewKind,
  InterviewType
} from '@staff-portal/graphql/staff'

import { createScheduleEngagementFragmentMock } from '../../../../data/fragments/schedule-engagement-fragment/mock'
import { createScheduleInterviewFragmentMock } from '../../../../data/fragments/schedule-interview-fragment/mock'
import { getScheduleInterviewEventDescription } from '../../../../utils'
import { adjustFormData } from './adjust-form-data'
import { ZOOM_PLACEHOLDER } from '../adjust-comment/adjust-comment'

describe('adjustFormData', () => {
  it('prepares the initial values for the form', () => {
    const data = adjustFormData({
      scheduleEngagement: createScheduleEngagementFragmentMock(),
      scheduleInterview: createScheduleInterviewFragmentMock({
        schedulingComment: 'foo'
      })
    })

    expect(data).toStrictEqual({
      timeZoneName: 'Asia/Kuwait',
      preferredDuration: undefined,
      initiator: InterviewInitiator.CANDIDATE,
      interviewType: InterviewType.GENERAL,
      comment: 'foo',
      communication: InterviewCommunicationType.PHONE,
      acceptForTalent: false,
      disableCompanyNotifications: false,
      interviewContacts: ['VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTEyMw'],
      scheduledAtTimes: [
        {
          date: undefined,
          time: ''
        }
      ],
      date: undefined,
      time: undefined,
      sendGoogleCalendarInvitation: false,
      gcSummary: 'Toptal Interview with Talent Full Name for Job Title',
      gcDescription: getScheduleInterviewEventDescription({
        kind: InterviewKind.INTERNAL,
        initiator: InterviewInitiator.CANDIDATE,
        communicationType: InterviewCommunicationType.PHONE,
        scheduleEngagement: createScheduleEngagementFragmentMock()
      }),
      gcUserReceivers: [],
      primaryContactId: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTEyMw'
    })
  })

  describe('when there is no "timeZone" and current user timeZone is provided', () => {
    it('sets initial timeZone from current user', () => {
      const data = adjustFormData({
        scheduleEngagement: createScheduleEngagementFragmentMock(),
        scheduleInterview: createScheduleInterviewFragmentMock({
          timeZone: null
        }),
        currentUserTimeZone: {
          name: '(UTC+01:00) Europe - London',
          value: 'Europe/London'
        }
      })

      expect(data).toEqual(
        expect.objectContaining({
          timeZoneName: 'Europe/London'
        })
      )
    })
  })

  describe('when communication type is `CUSTOM_WEB_CONFERENCE`', () => {
    it('prepares the initial values with the correct `comment` value', () => {
      const data = adjustFormData({
        scheduleEngagement: createScheduleEngagementFragmentMock(),
        scheduleInterview: createScheduleInterviewFragmentMock({
          schedulingComment: 'foo',
          communication: InterviewCommunicationType.CUSTOM_WEB_CONFERENCE
        })
      })

      expect(data).toEqual(
        expect.objectContaining({
          comment: `foo\n${ZOOM_PLACEHOLDER}`,
          communication: InterviewCommunicationType.CUSTOM_WEB_CONFERENCE
        })
      )
    })
  })
})
