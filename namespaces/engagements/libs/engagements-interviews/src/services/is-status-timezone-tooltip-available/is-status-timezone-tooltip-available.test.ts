import { EngagementStatus } from '@staff-portal/graphql/staff'

import { ENGAGEMENT_STATUSES_WITH_TIMEZONE_TOOLTIP } from '../../config'
import { isStatusTimezoneTooltipAvailable } from './is-status-timezone-tooltip-available'

describe('isStatusTimezoneTooltipAvailable', () => {
  describe('when status is missing', () => {
    it('returns false', () => {
      expect(
        isStatusTimezoneTooltipAvailable({
          timeZoneValue: 'America/Los_Angeles'
        })
      ).toBeFalsy()
    })
  })

  describe('when time zone value is missing', () => {
    it('returns false', () => {
      expect(
        isStatusTimezoneTooltipAvailable({
          status: EngagementStatus.ACTIVE
        })
      ).toBeFalsy()
    })
  })

  describe('when time zone value and status is missing', () => {
    it('returns false', () => {
      expect(isStatusTimezoneTooltipAvailable({})).toBeFalsy()
    })
  })

  it.each(ENGAGEMENT_STATUSES_WITH_TIMEZONE_TOOLTIP)(
    'returns true when Engagement status %s is passed',
    status => {
      expect(
        isStatusTimezoneTooltipAvailable({
          status,
          timeZoneValue: 'America/Los_Angeles'
        })
      ).toBeTruthy()
    }
  )

  it.each([EngagementStatus.PENDING_APPROVAL, EngagementStatus.READY_TO_SEND])(
    'returns false when non clock icon Engagement Status %s is passed',
    status => {
      expect(
        isStatusTimezoneTooltipAvailable({
          status,
          timeZoneValue: 'America/Los_Angeles'
        })
      ).toBeFalsy()
    }
  )
})
