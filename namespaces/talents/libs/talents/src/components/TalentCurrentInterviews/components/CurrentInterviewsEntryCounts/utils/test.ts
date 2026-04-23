import { getRoleTypeText } from '@staff-portal/facilities'
import {
  EngagementStatus,
  TalentCurrentInterviewsInterviewStatus
} from '@staff-portal/graphql/staff'
import { titleize } from '@staff-portal/string'

import { getStatusOrdering, getStatusText } from '.'

const talentType = 'Talent_Type'

describe('CurrentInterviewsEntryCounts Utils', () => {
  describe('getStatusOrdering', () => {
    it('gets an specific order', () => {
      expect(getStatusOrdering(EngagementStatus.PENDING)).toBe(0)
      expect(getStatusOrdering(EngagementStatus.REVIEWED)).toBe(1)
      expect(
        getStatusOrdering(
          EngagementStatus.REVIEWED,
          TalentCurrentInterviewsInterviewStatus.PENDING
        )
      ).toBe(1)
      expect(
        getStatusOrdering(
          EngagementStatus.REVIEWED,
          TalentCurrentInterviewsInterviewStatus.SCHEDULED
        )
      ).toBe(2)
      expect(
        getStatusOrdering(
          EngagementStatus.REVIEWED,
          TalentCurrentInterviewsInterviewStatus.TIME_REJECTED
        )
      ).toBe(3)
      expect(
        getStatusOrdering(
          EngagementStatus.REVIEWED,
          TalentCurrentInterviewsInterviewStatus.TIME_ACCEPTED
        )
      ).toBe(4)
      expect(
        getStatusOrdering(
          EngagementStatus.REVIEWED,
          TalentCurrentInterviewsInterviewStatus.MISSED
        )
      ).toBe(5)
      expect(
        getStatusOrdering(
          EngagementStatus.REVIEWED,
          TalentCurrentInterviewsInterviewStatus.ACCEPTED
        )
      ).toBe(6)
      expect(
        getStatusOrdering(
          EngagementStatus.REVIEWED,
          TalentCurrentInterviewsInterviewStatus.OCCURRED
        )
      ).toBe(7)
      expect(getStatusOrdering(EngagementStatus.PENDING_EXPIRATION)).toBe(8)
      expect(getStatusOrdering(EngagementStatus.SCHEDULED)).toBe(9)
      expect(getStatusOrdering(EngagementStatus.EXPIRATION_POSTPONED)).toBe(10)
    })
  })
  describe('getStatusText', () => {
    it('has specific text mapping', () => {
      expect(
        getStatusText({
          engagementStatus: EngagementStatus.PENDING,
          talentType
        })
      ).toBe('Pending Review')

      expect(
        getStatusText({
          engagementStatus: EngagementStatus.REVIEWED,
          interviewStatus: TalentCurrentInterviewsInterviewStatus.ACCEPTED,
          talentType
        })
      ).toBe(`${getRoleTypeText(talentType)} Accepted`)
      expect(
        getStatusText({
          engagementStatus: EngagementStatus.REVIEWED,
          interviewStatus: TalentCurrentInterviewsInterviewStatus.MISSED,
          talentType
        })
      ).toBe('Missed')
      expect(
        getStatusText({
          engagementStatus: EngagementStatus.REVIEWED,
          interviewStatus: TalentCurrentInterviewsInterviewStatus.OCCURRED,
          talentType
        })
      ).toBe('Interview Occurred')
      expect(
        getStatusText({
          engagementStatus: EngagementStatus.REVIEWED,
          interviewStatus: TalentCurrentInterviewsInterviewStatus.PENDING,
          talentType
        })
      ).toBe('Not scheduled')
      expect(
        getStatusText({
          engagementStatus: EngagementStatus.REVIEWED,
          interviewStatus: TalentCurrentInterviewsInterviewStatus.REJECTED,
          talentType
        })
      ).toBe(`${getRoleTypeText(talentType)} Rejected`)
      expect(
        getStatusText({
          engagementStatus: EngagementStatus.REVIEWED,
          interviewStatus: TalentCurrentInterviewsInterviewStatus.SCHEDULED,
          talentType
        })
      ).toBe('Waiting for Confirmation')
      expect(
        getStatusText({
          engagementStatus: EngagementStatus.REVIEWED,
          interviewStatus: TalentCurrentInterviewsInterviewStatus.TIME_ACCEPTED,
          talentType
        })
      ).toBe('Interview time confirmed')
      expect(
        getStatusText({
          engagementStatus: EngagementStatus.REVIEWED,
          interviewStatus: TalentCurrentInterviewsInterviewStatus.TIME_REJECTED,
          talentType
        })
      ).toBe('Interview time rejected')

      expect(
        getStatusText({ engagementStatus: EngagementStatus.ACTIVE, talentType })
      ).toBe(titleize(EngagementStatus.ACTIVE))
      expect(
        getStatusText({
          engagementStatus: EngagementStatus.CANCELLED,
          talentType
        })
      ).toBe(titleize(EngagementStatus.CANCELLED))
      expect(
        getStatusText({
          engagementStatus: EngagementStatus.CANCELLED_DRAFT,
          talentType
        })
      ).toBe(titleize(EngagementStatus.CANCELLED_DRAFT))
      expect(
        getStatusText({ engagementStatus: EngagementStatus.CLOSED, talentType })
      ).toBe(titleize(EngagementStatus.CLOSED))
      expect(
        getStatusText({ engagementStatus: EngagementStatus.DRAFT, talentType })
      ).toBe(titleize(EngagementStatus.DRAFT))
      expect(
        getStatusText({
          engagementStatus: EngagementStatus.END_SCHEDULED,
          talentType
        })
      ).toBe(titleize(EngagementStatus.END_SCHEDULED))
      expect(
        getStatusText({
          engagementStatus: EngagementStatus.EXPIRATION_POSTPONED,
          talentType
        })
      ).toBe(titleize(EngagementStatus.EXPIRATION_POSTPONED))
      expect(
        getStatusText({
          engagementStatus: EngagementStatus.EXPIRED,
          talentType
        })
      ).toBe(titleize(EngagementStatus.EXPIRED))
      expect(
        getStatusText({
          engagementStatus: EngagementStatus.ON_BREAK,
          talentType
        })
      ).toBe(titleize(EngagementStatus.ON_BREAK))
      expect(
        getStatusText({
          engagementStatus: EngagementStatus.ON_HOLD,
          talentType
        })
      ).toBe(titleize(EngagementStatus.ON_HOLD))
      expect(
        getStatusText({
          engagementStatus: EngagementStatus.ON_TRIAL,
          talentType
        })
      ).toBe(titleize(EngagementStatus.ON_TRIAL))

      expect(
        getStatusText({
          engagementStatus: EngagementStatus.PENDING_APPROVAL,
          talentType
        })
      ).toBe(titleize(EngagementStatus.PENDING_APPROVAL))
      expect(
        getStatusText({
          engagementStatus: EngagementStatus.PENDING_EXPIRATION,
          talentType
        })
      ).toBe(titleize(EngagementStatus.PENDING_EXPIRATION))
      expect(
        getStatusText({
          engagementStatus: EngagementStatus.PENDING_LEGAL,
          talentType
        })
      ).toBe(titleize(EngagementStatus.PENDING_LEGAL))
      expect(
        getStatusText({
          engagementStatus: EngagementStatus.READY_TO_SEND,
          talentType
        })
      ).toBe(titleize(EngagementStatus.READY_TO_SEND))
      expect(
        getStatusText({
          engagementStatus: EngagementStatus.REJECTED_DRAFT,
          talentType
        })
      ).toBe(titleize(EngagementStatus.REJECTED_DRAFT))
      expect(
        getStatusText({
          engagementStatus: EngagementStatus.REJECTED_INTERVIEW,
          talentType
        })
      ).toBe(titleize(EngagementStatus.REJECTED_INTERVIEW))
      expect(
        getStatusText({
          engagementStatus: EngagementStatus.REJECTED_TRIAL,
          talentType
        })
      ).toBe(titleize(EngagementStatus.REJECTED_TRIAL))

      expect(
        getStatusText({
          engagementStatus: EngagementStatus.SCHEDULED,
          talentType
        })
      ).toBe(titleize(EngagementStatus.SCHEDULED))
    })
  })
})
