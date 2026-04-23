import getRequiredJobHours from '../get-required-job-hours'
import getRequiredJobHoursVerbose from './get-required-job-hours-verbose'

jest.mock('../get-required-job-hours')
const mockGetRequiredJobHours = getRequiredJobHours as jest.Mock

describe('getRequiredJobHoursVerbose', () => {
  describe('when hours is missing', () => {
    it('returns undefined', () => {
      mockGetRequiredJobHours.mockReturnValue(null)

      expect(getRequiredJobHoursVerbose({})).toBeUndefined()
    })
  })

  describe('when there is a single hour', () => {
    it('returns hour', () => {
      mockGetRequiredJobHours.mockReturnValue(1)

      expect(getRequiredJobHoursVerbose({})).toBe('1 hour')
    })
  })

  describe('when there are multiple hours', () => {
    it('returns hours', () => {
      mockGetRequiredJobHours.mockReturnValue(3)

      expect(getRequiredJobHoursVerbose({})).toBe('3 hours')
    })
  })
})
