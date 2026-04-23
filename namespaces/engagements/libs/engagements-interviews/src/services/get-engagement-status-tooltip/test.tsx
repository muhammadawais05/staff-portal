import React from 'react'
import { EngagementTooltipStatus } from '@staff-portal/graphql/staff'
import { EngagementCumulativeStatus } from '@staff-portal/engagements'

import getEngagementStatusTooltip from './get-engagement-status-tooltip'

const mockedEngagement = () => ({
  cumulativeStatus: EngagementCumulativeStatus.ACTIVE
})

describe('getEngagementStatusTooltip', () => {
  it('returns undefined if no options provided', () => {
    const tooltip = getEngagementStatusTooltip(mockedEngagement())

    expect(tooltip).toBeUndefined()
  })

  describe('default tooltip', () => {
    it('returns "engagement ended feedback reason" for TIMEZONE_AND_FEEDBACK_ENGAGEMENT_ENDED tooltip', () => {
      const tooltip = getEngagementStatusTooltip(mockedEngagement(), {
        type: 'default',
        tooltipStatus:
          EngagementTooltipStatus.TIMEZONE_AND_FEEDBACK_ENGAGEMENT_ENDED,
        engagementEndedFeedbackReason: {
          name: 'test reason'
        },
        postponedPerformedAction: null
      })

      expect(tooltip).toBe('test reason')
    })

    it('returns "postponed performed action" comment for POSTPONED_PERFORMED_ACTION_COMMENT tooltip', () => {
      const tooltip = getEngagementStatusTooltip(mockedEngagement(), {
        type: 'default',
        tooltipStatus:
          EngagementTooltipStatus.POSTPONED_PERFORMED_ACTION_COMMENT,
        postponedPerformedAction: {
          comment: 'performed action comment'
        },
        engagementEndedFeedbackReason: null
      })

      expect(tooltip).toBe('performed action comment')
    })

    it('returns undefined for TIMEZONE tooltip', () => {
      const tooltip = getEngagementStatusTooltip(mockedEngagement(), {
        type: 'default',
        tooltipStatus: EngagementTooltipStatus.TIMEZONE,
        engagementEndedFeedbackReason: {
          name: 'test reason'
        },
        postponedPerformedAction: {
          comment: 'performed action comment'
        }
      })

      expect(tooltip).toBeUndefined()
    })

    it('returns undefined for NO_TOOLTIP tooltip', () => {
      const tooltip = getEngagementStatusTooltip(mockedEngagement(), {
        type: 'default',
        tooltipStatus: EngagementTooltipStatus.NO_TOOLTIP,
        engagementEndedFeedbackReason: {
          name: 'test reason'
        },
        postponedPerformedAction: {
          comment: 'performed action comment'
        }
      })

      expect(tooltip).toBeUndefined()
    })
  })

  describe('extended tooltip', () => {
    it('returns "postponed performed action" comment for EXPIRATION_POSTPONED engagement', () => {
      const tooltip = getEngagementStatusTooltip(
        {
          cumulativeStatus: EngagementCumulativeStatus.EXPIRATION_POSTPONED
        },
        {
          type: 'extended',
          postponedPerformedAction: {
            comment: 'performed action comment'
          }
        }
      )

      expect(tooltip).toBe('performed action comment')
    })

    it('returns status feedback comment if specified', () => {
      const tooltip = getEngagementStatusTooltip(mockedEngagement(), {
        type: 'extended',
        statusFeedback: {
          comment: 'feedback',
          reason: {
            name: 'test reason'
          }
        }
      })

      expect(tooltip).toEqual(
        <>
          <b>test reason</b>
          <br />
          feedback
        </>
      )
    })
  })
})
