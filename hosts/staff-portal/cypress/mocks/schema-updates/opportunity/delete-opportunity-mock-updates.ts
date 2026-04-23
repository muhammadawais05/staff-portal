import {
  Opportunity,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'

import { opportunityNodeMock } from '~integration/mocks/fragments'
import {
  operationMock,
  successOperationMock
} from '~integration/mocks/operations'

const updateDeleteOpportunityMocks = (opportunity?: Partial<Opportunity>) =>
  cy.updateStaffMocks({
    Query: {
      node: () => ({
        ...opportunityNodeMock({
          opportunityOperation: operationMock(
            'deleteOpportunity',
            OperationCallableTypes.ENABLED
          )
        }).node(),
        ...opportunity
      })
    },
    Mutation: {
      deleteOpportunity: successOperationMock
    }
  })

export default updateDeleteOpportunityMocks
