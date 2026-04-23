import {
  CumulativeJobStatus,
  JobStatus,
  Job
} from '@staff-portal/graphql/staff'

import { getJobVerboseStatus } from './get-job-verbose-status'

type JobStatusInput = Pick<
  Job,
  | 'cumulativeStatus'
  | 'hiredCount'
  | 'matcherCallScheduled'
  | 'status'
  | 'talentCount'
>

describe('#getJobVerboseStatus', () => {
  describe('when `showFulfillmentStatus` is `true`', () => {
    describe('when `JobStatus` is `PENDING_ENGINEER`', () => {
      describe('when `compact` is `false`', () => {
        it('return "2 of 2 Positions Filled"', () => {
          const mockJob = {
            hiredCount: 2,
            status: JobStatus.PENDING_ENGINEER,
            talentCount: 2
          }
          const result = getJobVerboseStatus(mockJob as JobStatusInput)

          expect(result).toBe('2 of 2 Positions Filled')
        })
      })

      describe('when `compact` is `true`', () => {
        it('return "2 of 2 Filled"', () => {
          const mockJob = {
            hiredCount: 2,
            status: JobStatus.PENDING_ENGINEER,
            talentCount: 2
          }
          const result = getJobVerboseStatus(
            mockJob as JobStatusInput,
            undefined,
            true
          )

          expect(result).toBe('2 of 2 Filled')
        })
      })
    })

    describe('when `matcherCallScheduled` is `false`', () => {
      describe('when `status` is `isPendingClaim`', () => {
        it('return pendingClaim noCall translation', () => {
          const mockJob = {
            cumulativeStatus: CumulativeJobStatus.PENDING_CLAIM,
            matcherCallScheduled: false,
            status: JobStatus.PENDING_CLAIM,
            talentCount: 2
          }
          const result = getJobVerboseStatus(mockJob as JobStatusInput)

          expect(result).toBe('Pending claim (no call)')
        })
      })

      describe('when `status` is  not `isPendingClaim`', () => {
        it('return pendingClaim noCall translation', () => {
          const mockJob = {
            cumulativeStatus: CumulativeJobStatus.PENDING_CLAIM,
            matcherCallScheduled: false,
            status: JobStatus.DRAFT_CONFIRMED,
            talentCount: 2
          }
          const result = getJobVerboseStatus(mockJob as JobStatusInput)

          expect(result).toBe('Pending claim')
        })
      })
    })
  })
})
