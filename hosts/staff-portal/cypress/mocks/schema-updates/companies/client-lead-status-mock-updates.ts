import { Client } from '@staff-portal/graphql/staff'

import {
  clientBasicInfoMock,
  clientEnterpriseFollowUpStatusesMock,
  clientEnterpriseLeadStatusesMock,
  staffNodeMock
} from '~integration/mocks/fragments'
import { successOperationMock } from '~integration/mocks/operations'

const updateClientLeadStatusMocks = (client?: Partial<Client>) =>
  cy.updateStaffMocks({
    Query: {
      staffNode: staffNodeMock,
      node: clientBasicInfoMock,
      clientEnterpriseFollowUpStatuses: clientEnterpriseFollowUpStatusesMock,
      clientEnterpriseLeadStatuses: clientEnterpriseLeadStatusesMock
    },
    Mutation: {
      updateClientEnterpriseLeadStatus: () => successOperationMock(client)
    }
  })

export default updateClientLeadStatusMocks
