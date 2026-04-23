import { CumulativeJobStatus, JobStatus } from '@staff-portal/graphql/staff'

import { getJobStatusColor } from './get-job-status-color'

describe('#getJobStatusColor', () => {
  describe('when the job `talentCount` is `1`', () => {
    it('return green', () => {
      expect(
        getJobStatusColor({
          talentCount: 1,
          cumulativeStatus: CumulativeJobStatus.ACTIVE,
          hiredCount: 0,
          status: JobStatus.ACTIVE
        })
      ).toBe('green')
    })
  })

  describe('when the job is under investigation', () => {
    it('returns red', () => {
      expect(
        getJobStatusColor({
          currentInvestigation: {
            id: 'abc',
            startedAt: '2020-02-20T00:00:00+00:00'
          },
          hiredCount: 0,
          cumulativeStatus: CumulativeJobStatus.DRAFT_CONFIRMED,
          status: JobStatus.DRAFTED_BY_SALES,
          talentCount: 1
        })
      ).toBe('red')
    })

    it('returns default color if ignoreInvestigationStatus equals true', () => {
      expect(
        getJobStatusColor(
          {
            currentInvestigation: {
              id: 'abc',
              startedAt: '2020-02-20T00:00:00+00:00'
            },
            hiredCount: 0,
            cumulativeStatus: CumulativeJobStatus.ACTIVE,
            status: JobStatus.ACTIVE,
            talentCount: 1
          },
          true
        )
      ).toBe('green')
    })
  })

  describe('when hiredCount is less than talentCount', () => {
    it('return yellow', () => {
      expect(
        getJobStatusColor({
          hiredCount: 1,
          talentCount: 3,
          cumulativeStatus: CumulativeJobStatus.DRAFT_CONFIRMED,
          status: JobStatus.DRAFTED_BY_SALES
        })
      ).toBe('yellow')
    })
  })

  describe('when hiredCount is `0`', () => {
    it('return `yellow`', () => {
      expect(
        getJobStatusColor({
          hiredCount: 0,
          cumulativeStatus: CumulativeJobStatus.DRAFT_CONFIRMED,
          status: JobStatus.DRAFTED_BY_SALES,
          talentCount: 3
        })
      ).toBe('yellow')
    })
  })

  describe('when `JobStatus` is `Active`', () => {
    it('return green', () => {
      expect(
        getJobStatusColor({
          status: JobStatus.ACTIVE,
          hiredCount: 0,
          cumulativeStatus: CumulativeJobStatus.DRAFT_CONFIRMED,
          talentCount: 3
        })
      ).toBe('green')
    })
  })

  describe.each`
    cumulativeStatus                        | color
    ${CumulativeJobStatus.ACTIVE}           | ${'green'}
    ${CumulativeJobStatus.PENDING_CLAIM}    | ${'yellow'}
    ${CumulativeJobStatus.PENDING_ENGINEER} | ${'yellow'}
    ${CumulativeJobStatus.POSTPONED}        | ${'red'}
    ${CumulativeJobStatus.REJECTED}         | ${'red'}
    ${CumulativeJobStatus.SENDING_AWAY}     | ${'red'}
    ${CumulativeJobStatus.CLOSED}           | ${undefined}
    ${CumulativeJobStatus.REMOVED}          | ${undefined}
    ${'any other case'}                     | ${undefined}
  `(
    'when cumulativeStatus is `$cumulativeStatus`',
    ({ cumulativeStatus, color }) => {
      it(`return color ${color}`, () => {
        const mockJob = {
          cumulativeStatus,
          talentCount: 2,
          hiredCount: 2,
          status: cumulativeStatus
        }

        const result = getJobStatusColor(mockJob)

        expect(result).toEqual(color)
      })
    }
  )
})
