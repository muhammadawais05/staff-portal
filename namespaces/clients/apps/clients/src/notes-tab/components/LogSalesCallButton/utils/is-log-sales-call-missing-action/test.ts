import { CompanyAction } from '@staff-portal/graphql/staff'

import { LogSalesCallMissingAction } from '../../../../types'
import { isLogSalesCallMissingAction } from './is-log-sales-call-missing-action'

describe('isLogSalesCallMissingAction', () => {
  it('returns false when is not a log sales call missing action', () => {
    expect(isLogSalesCallMissingAction(CompanyAction.APPROVE)).toBeFalsy()
  })

  it('returns true when is a log sales call missing action', () => {
    expect(
      isLogSalesCallMissingAction(LogSalesCallMissingAction.CHECK_COMPLIANCE)
    ).toBeTruthy()
  })
})
