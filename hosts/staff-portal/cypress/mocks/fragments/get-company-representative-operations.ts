import { CompanyRepresentativeOperations } from '@staff-portal/graphql/staff'

import { WithTypename } from '~integration/types'
import { hiddenOperationMock } from '../hidden-operation-mock'

export const getCompanyRepresentativeOperations = (
  operations?: Partial<CompanyRepresentativeOperations>
): WithTypename<CompanyRepresentativeOperations> => ({
  __typename: 'CompanyRepresentativeOperations',
  addRoleFlag: hiddenOperationMock(),
  assignCompanyRepresentativeToJob: hiddenOperationMock(),
  callRole: hiddenOperationMock(),
  changeRoleReferrer: hiddenOperationMock(),
  createConversationForStaff: hiddenOperationMock(),
  createMeeting: hiddenOperationMock(),
  deactivateCompanyRepresentative: hiddenOperationMock(),
  downloadRolePaymentHistory: hiddenOperationMock(),
  inviteToLoginCompanyRepresentative: hiddenOperationMock(),
  loginAs: hiddenOperationMock(),
  markCompanyRepresentativeAsPrimary: hiddenOperationMock(),
  reactivateCompanyRepresentative: hiddenOperationMock(),
  resetRoleReferrer: hiddenOperationMock(),
  unlinkOpportunityCompanyRepresentative: hiddenOperationMock(),
  updateBillingNotes: hiddenOperationMock(),
  updateCompanyRepresentativePhoneNumbers: hiddenOperationMock(),
  updateCompanyRepresentativeProfile: hiddenOperationMock(),
  updateRoleOfacStatus: hiddenOperationMock(),
  updateRolePhoto: hiddenOperationMock(),
  linkOpportunityCompanyRepresentative: hiddenOperationMock(),
  ...operations
})
