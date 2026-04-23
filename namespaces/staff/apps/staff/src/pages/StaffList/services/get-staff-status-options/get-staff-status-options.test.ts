import { StaffCumulativeStatus } from '@staff-portal/graphql/staff'

import getStaffStatusOptions from './get-staff-status-options'

describe('getStaffStatusOptions', () => {
  it('returns formatted Staff status options', () => {
    expect(getStaffStatusOptions()).toStrictEqual([
      { value: StaffCumulativeStatus.APPLIED, label: 'Applied' },
      { value: StaffCumulativeStatus.ACTIVE, label: 'Active' },
      { value: StaffCumulativeStatus.REJECTED, label: 'Rejected' },
      { value: StaffCumulativeStatus.REMOVED, label: 'Deleted' }
    ])
  })
})
