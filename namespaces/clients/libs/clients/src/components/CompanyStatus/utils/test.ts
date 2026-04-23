import { ClientCumulativeStatus } from '@staff-portal/graphql/staff'

import {
  getCompanyVerboseStatus,
  getCompanyStatusColor,
  getCompanyTooltip
} from '.'

describe('getCompanyVerboseStatus', () => {
  it('titalizes a custom status', () => {
    return expect(
      getCompanyVerboseStatus('hello world' as string as ClientCumulativeStatus)
    ).toBe('Hello world')
  })

  it('works correct for Company and for CompanyApplicant', () => {
    expect(getCompanyVerboseStatus(ClientCumulativeStatus.ACTIVE)).toBe(
      'Active'
    )
    expect(getCompanyVerboseStatus(ClientCumulativeStatus.APPLIED)).toBe(
      'Applied'
    )
    expect(getCompanyVerboseStatus(ClientCumulativeStatus.BAD_LEAD)).toBe(
      'Bad Lead'
    )
    expect(
      getCompanyVerboseStatus(ClientCumulativeStatus.BLACK_FLAGGED)
    ).toBe('Black Flagged')
    expect(getCompanyVerboseStatus(ClientCumulativeStatus.CONTACTED)).toBe(
      'Contacted (has notes)'
    )
    expect(getCompanyVerboseStatus(ClientCumulativeStatus.HAD_JOB)).toBe(
      'Active (with ended job)'
    )
    expect(
      getCompanyVerboseStatus(ClientCumulativeStatus.HAS_ACTIVE_JOB)
    ).toBe('Active (with current job)')

    expect(
      getCompanyVerboseStatus(ClientCumulativeStatus.OVERDUE_INVOICES)
    ).toBe('Overdue Invoices')
    expect(
      getCompanyVerboseStatus(ClientCumulativeStatus.PAUSED_ACTIVE)
    ).toBe('Active (paused)')
    expect(
      getCompanyVerboseStatus(ClientCumulativeStatus.PAUSED_APPLIED)
    ).toBe('Applied (paused)')
    expect(
      getCompanyVerboseStatus(ClientCumulativeStatus.PENDING_BILLING_INFO)
    ).toBe('Pending Billing Info')
    expect(getCompanyVerboseStatus(ClientCumulativeStatus.PENDING_TOS)).toBe(
      'Pending TOS'
    )
    expect(getCompanyVerboseStatus(ClientCumulativeStatus.REJECTED)).toBe(
      'Deleted'
    )
    expect(getCompanyVerboseStatus(ClientCumulativeStatus.SOURCED)).toBe(
      'Sourced'
    )
  })
})

describe('getCompanyStatusColor', () => {
  describe('when there is no investigation', () => {
    it('returns green statuses', () => {
      ;[
        ClientCumulativeStatus.ACTIVE,
        ClientCumulativeStatus.HAD_JOB,
        ClientCumulativeStatus.HAS_ACTIVE_JOB
      ].forEach(status => {
        expect(
          getCompanyStatusColor({
            cumulativeStatus: status,
            investigations: null
          })
        ).toBe('green')
      })
    })

    it('returns yellow statuses', () => {
      ;[
        ClientCumulativeStatus.CONTACTED,
        ClientCumulativeStatus.OVERDUE_INVOICES,
        ClientCumulativeStatus.PAUSED_ACTIVE,
        ClientCumulativeStatus.PAUSED_APPLIED,
        ClientCumulativeStatus.PENDING_BILLING_INFO,
        ClientCumulativeStatus.PENDING_TOS,
        ClientCumulativeStatus.SOURCED
      ].forEach(status => {
        expect(
          getCompanyStatusColor({
            cumulativeStatus: status,
            investigations: null
          })
        ).toBe('yellow')
      })
    })

    it('returns red statuses', () => {
      ;[
        ClientCumulativeStatus.BLACK_FLAGGED,
        ClientCumulativeStatus.REJECTED
      ].forEach(status => {
        expect(
          getCompanyStatusColor({
            cumulativeStatus: status,
            investigations: null
          })
        ).toBe('red')
      })
    })
  })
  describe('when there is an investigation', () => {
    it('returns red status', () => {
      const status = getCompanyStatusColor({
        cumulativeStatus: ClientCumulativeStatus.SOURCED,
        investigations: { nodes: [{ startedAt: '2019-01-01T00:00:00+00:00' }] }
      })

      expect(status).toBe('red')
    })
  })
})

describe('getCompanyTooltip', () => {
  it('does not have a tooltip', () => {
    expect(getCompanyTooltip(null)).toBeUndefined()
  })

  it('has a tooltip', () => {
    expect(
      getCompanyTooltip({
        nodes: [
          {
            startedAt: '2020-02-20T00:00:00+00:00'
          }
        ]
      })
    ).toBe('Investigation since Feb 20, 2020')
  })
})
