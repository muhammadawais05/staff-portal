import { StaffOperations } from '@staff-portal/graphql/staff'

import { enabledOperationMock, hiddenOperationMock } from '~integration/mocks'

export const getStaffProfileOperations = (
  operations?: Partial<StaffOperations>
) =>
  ({
    addRoleFlag: enabledOperationMock(),
    updateProfileStaff: enabledOperationMock(),
    deactivateStaff: enabledOperationMock(),
    reactivateStaff: hiddenOperationMock(),
    loginAs: enabledOperationMock(),
    downloadRolePaymentHistory: enabledOperationMock(),
    updateBillingNotes: enabledOperationMock(),
    updatePaymentsEmployeeType: enabledOperationMock(),
    updatePaymentsFrequency: enabledOperationMock(),
    __typename: 'StaffOperations',
    ...operations
  } as StaffOperations)
