import {
  InterviewCommunicationType,
  InterviewInitiator,
  InterviewKind
} from '@staff-portal/graphql/staff'

import { createScheduleEngagementFragmentMock } from '../../data/fragments/schedule-engagement-fragment/mock'
import { getScheduleInterviewEventDescription } from './get-schedule-interview-event-description'

const arrangeTest = ({
  kind = InterviewKind.EXTERNAL,
  initiator = InterviewInitiator.CANDIDATE,
  communicationType = InterviewCommunicationType.PHONE
}: Partial<{
  kind: InterviewKind
  initiator: InterviewInitiator
  communicationType?: InterviewCommunicationType
}>) =>
  getScheduleInterviewEventDescription({
    kind,
    initiator,
    communicationType,
    scheduleEngagement: createScheduleEngagementFragmentMock()
  })

describe('getScheduleInterviewEventDescription', () => {
  describe('Skype', () => {
    it('returns internal message', () => {
      expect(
        arrangeTest({
          communicationType: InterviewCommunicationType.SKYPE,
          kind: InterviewKind.INTERNAL
        })
      ).toBe(`Interview with Talent Full Name for Job Title.

Talent Full Name will Skype Interviewer at <<MATCHER_ENTER_INTERVIEWER_SKYPE>>.
If you need to reschedule or make changes to the interview, please contact Claimer Full Name
test@test.test
claimer-123456
Skype: skype_id`)
    })

    it('returns external message', () => {
      expect(
        arrangeTest({
          communicationType: InterviewCommunicationType.SKYPE,
          kind: InterviewKind.EXTERNAL
        })
      ).toBe(`Interview with Talent Full Name for Job Title at Client Full Name.

Talent Full Name will Skype Client Full Name at <<MATCHER_ENTER_CLIENT_CONTACT>>.
If you need to reschedule or make changes to the interview, please contact Claimer Full Name
test@test.test
claimer-123456
Skype: skype_id`)
    })
  })

  describe('Phone', () => {
    it('returns internal message', () => {
      expect(
        arrangeTest({
          communicationType: InterviewCommunicationType.PHONE,
          kind: InterviewKind.INTERNAL
        })
      ).toBe(`Interview with Talent Full Name for Job Title.

Talent Full Name will call Interviewer at <<MATCHER_ENTER_INTERVIEWER_PHONE>>.
If you need to reschedule or make changes to the interview, please contact Claimer Full Name
test@test.test
claimer-123456
Skype: skype_id`)
    })

    it('returns external message', () => {
      expect(
        arrangeTest({
          communicationType: InterviewCommunicationType.PHONE,
          kind: InterviewKind.EXTERNAL
        })
      ).toBe(`Interview with Talent Full Name for Job Title at Client Full Name.

Talent Full Name will call <<MATCHER_ENTER_CLIENT_CONTACT>> at client-123456.
If you need to reschedule or make changes to the interview, please contact Claimer Full Name
test@test.test
claimer-123456
Skype: skype_id`)
    })
  })

  describe('Bluejeans', () => {
    it('returns internal message', () => {
      expect(
        arrangeTest({
          communicationType: InterviewCommunicationType.BLUEJEANS,
          kind: InterviewKind.INTERNAL
        })
      ).toBe(`Interview with Talent Full Name for Job Title.

Interview will happen via webconference. Use this URL to join the conference: {{web_conference_url}}.
If you need to reschedule or make changes to the interview, please contact Claimer Full Name
test@test.test
claimer-123456
Skype: skype_id`)
    })

    it('returns external message', () => {
      expect(
        arrangeTest({
          communicationType: InterviewCommunicationType.BLUEJEANS,
          kind: InterviewKind.EXTERNAL
        })
      ).toBe(`Interview with Talent Full Name for Job Title at Client Full Name.

Interview will happen via webconference. Use this URL to join the conference: {{web_conference_url}}.
If you need to reschedule or make changes to the interview, please contact Claimer Full Name
test@test.test
claimer-123456
Skype: skype_id`)
    })
  })

  describe('Web Conference', () => {
    it('returns internal message', () => {
      expect(
        arrangeTest({
          communicationType: InterviewCommunicationType.CUSTOM_WEB_CONFERENCE,
          kind: InterviewKind.INTERNAL
        })
      ).toBe(`Interview with Talent Full Name for Job Title.

Interview will happen via webconference. Use this URL to join the conference: <<MATCHER_ZOOM_URL>>.
If you need to reschedule or make changes to the interview, please contact Claimer Full Name
test@test.test
claimer-123456
Skype: skype_id`)
    })

    it('returns external message', () => {
      expect(
        arrangeTest({
          communicationType: InterviewCommunicationType.CUSTOM_WEB_CONFERENCE,
          kind: InterviewKind.EXTERNAL
        })
      ).toBe(`Interview with Talent Full Name for Job Title at Client Full Name.

Interview will happen via webconference. Use this URL to join the conference: <<MATCHER_ZOOM_URL>>.
If you need to reschedule or make changes to the interview, please contact Claimer Full Name
test@test.test
claimer-123456
Skype: skype_id`)
    })
  })
})
