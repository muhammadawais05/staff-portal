import { CumulativeJobStatus, Job } from '@staff-portal/graphql/staff'

import { getJobStatusTooltip } from './get-job-status-tooltip'
import { JobWithCurrentInvestigation } from '../types'

type JobStatusTooltipInput = Pick<
  Job,
  | 'cumulativeStatus'
  | 'engagementEndedFeedbackReason'
  | 'status'
  | 'talentCount'
> &
  JobWithCurrentInvestigation

describe('#getJobStatusTooltip', () => {
  describe('when `currentInvestigation` is ongoing', () => {
    it('return currentInvestigation', () => {
      const mockJob = {
        currentInvestigation: { id: 'abc', startedAt: '2020-02-20' }
      }

      const result = getJobStatusTooltip(mockJob as JobStatusTooltipInput)

      expect(result).toBe('Investigation since Feb 20, 2020')
    })
  })

  describe('when multiple hires', () => {
    it('return multipleHires translation', () => {
      const mockJob = {
        talentCount: 2
      }

      const result = getJobStatusTooltip(mockJob as JobStatusTooltipInput)

      expect(result).toBe(
        'This job has multiple hires. View job details to see the status of individual hires.'
      )
    })
  })

  describe('when cumulativeStatus is CLOSED', () => {
    it('return undefined', () => {
      const engagementEndedFeedbackName = 'engagementEndedFeedbackName'
      const mockJob = {
        cumulativeStatus: CumulativeJobStatus.CLOSED,
        engagementEndedFeedbackReason: {
          name: engagementEndedFeedbackName
        },
        talentCount: 1
      }

      const result = getJobStatusTooltip(mockJob as JobStatusTooltipInput)

      expect(result).toBeUndefined()
    })
  })

  describe('when cumulativeStatus is ANYTHING BUT CLOSED or END_SCHEDULED', () => {
    it('return null', () => {
      const mockJob = {
        cumulativeStatus: CumulativeJobStatus.ON_BREAK,
        talentCount: 1
      }

      const result = getJobStatusTooltip(mockJob as JobStatusTooltipInput)

      expect(result).toBeUndefined()
    })
  })

  describe.each([
    CumulativeJobStatus.ACTIVE,
    CumulativeJobStatus.ON_TRIAL,
    CumulativeJobStatus.ON_HOLD,
    CumulativeJobStatus.ON_BREAK,
    CumulativeJobStatus.PENDING_CLAIM,
    CumulativeJobStatus.PENDING_ENGINEER,
    CumulativeJobStatus.PENDING_START,
    CumulativeJobStatus.POSTPONED,
    CumulativeJobStatus.REJECTED,
    CumulativeJobStatus.SENDING_AWAY,
    CumulativeJobStatus.REMOVED,
    'any other case'
  ])('when single hire and cumulativeStatus is %s', cumulativeStatus => {
    it('return null', () => {
      const mockJob = {
        cumulativeStatus,
        talentCount: 1
      }

      const result = getJobStatusTooltip(mockJob as JobStatusTooltipInput)

      expect(result).toBeUndefined()
    })
  })
})
