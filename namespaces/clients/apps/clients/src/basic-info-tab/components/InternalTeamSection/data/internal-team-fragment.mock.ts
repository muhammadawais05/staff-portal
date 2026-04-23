import {
  BusinessTypes,
  ClientClaimerCategory,
  ClientCumulativeStatus,
  ClientPartnerCategory
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { createOperationMock } from '@staff-portal/operations/src/mocks'

const operationMock = createOperationMock()

export const internalTeamFragmentMock = {
  __typename: 'Client',
  id: encodeEntityId('1', 'Client'),
  businessType: BusinessTypes.ENTERPRISE_BUSINESS,
  cumulativeStatus: ClientCumulativeStatus.SOURCED,
  clientPartnerCategory: ClientPartnerCategory.CORE,
  matchers: {
    edges: [
      {
        node: {
          id: encodeEntityId('10', 'ClientMatcher'),
          role: {
            id: encodeEntityId('10', 'Staff'),
            fullName: 'Jason Stentley',
            webResource: {
              text: 'Jason Stentley',
              url: 'https://cool.page'
            }
          },
          vertical: {
            id: encodeEntityId('3', 'Vertical'),
            talentType: 'developer'
          }
        },
        handoff: null
      }
    ]
  },
  salesAnalyst: {
    id: encodeEntityId('1', 'Staff'),
    fullName: 'Amy Santiago',
    webResource: {
      url: 'https://staging.toptal.net/platform/staff/staff/123456',
      text: 'Amy Santiago'
    },
    __typename: 'Staff'
  },
  matchingOperationsCoordinator: {
    id: encodeEntityId('2', 'Staff'),
    fullName: 'Jake Peralta',
    webResource: {
      text: 'Jake Peralta',
      url: 'https://staging.toptal.net/platform/staff/staff/123456'
    },
    __typename: 'Staff'
  },
  relationshipManager: {
    id: encodeEntityId('3', 'Staff'),
    fullName: 'Charles Boyle',
    webResource: {
      text: 'Charles Boyle',
      url: 'https://staging.toptal.net/platform/staff/staff/123456'
    }
  },
  projectRelationshipManager: {
    id: encodeEntityId('4', 'Staff'),
    fullName: 'Raymond Holt',
    webResource: {
      text: 'Raymond Holt',
      url: 'https://staging.toptal.net/platform/staff/staff/123456'
    }
  },
  projectDeliveryManager: {
    id: encodeEntityId('5', 'Staff'),
    fullName: 'Terry Jeffords',
    webResource: {
      text: 'Terry Jeffords',
      url: 'https://staging.toptal.net/platform/staff/staff/123456'
    }
  },
  accountManager: {
    id: encodeEntityId('6', 'Staff'),
    fullName: 'Rosa Diaz',
    webResource: {
      text: 'Rosa Diaz',
      url: 'https://staging.toptal.net/platform/staff/staff/123456'
    }
  },
  projectSalesSpecialist: {
    id: encodeEntityId('7', 'Staff'),
    fullName: 'Gina Linetti',
    webResource: {
      text: 'Gina Linetti',
      url: 'https://staging.toptal.net/platform/staff/staff/123456'
    },
    __typename: 'Staff'
  },
  salesDevelopmentRepresentative: {
    id: encodeEntityId('8', 'Staff'),
    fullName: 'Michael Hitchcook',
    webResource: {
      text: 'Michael Hitchcook',
      url: 'https://staging.toptal.net/platform/staff/staff/123456'
    },
    __typename: 'Staff'
  },
  claimer: {
    id: encodeEntityId('13', 'Staff'),
    fullName: 'Adrian Pimento',
    webResource: {
      text: 'Adrian Pimento',
      url: 'https://staging.toptal.net/platform/staff/staff/123456'
    },
    __typename: 'Staff'
  },
  clientPartner: {
    id: encodeEntityId('9', 'Staff'),
    fullName: 'Trudy Judy',
    webResource: {
      text: 'Trudy Judy',
      url: 'https://staging.toptal.net/platform/staff/staff/123456'
    },
    __typename: 'Staff'
  },
  enterpriseSalesExecutive: {
    id: encodeEntityId('14', 'Staff'),
    fullName: 'Amos Burton',
    webResource: {
      text: 'Amos Burton',
      url: 'https://staging.toptal.net/platform/staff/staff/123456'
    },
    __typename: 'Staff'
  },
  accountOwner: {
    id: encodeEntityId('15', 'Staff'),
    fullName: 'James Holden',
    webResource: {
      text: 'James Holden',
      url: 'https://staging.toptal.net/platform/staff/staff/123456'
    },
    __typename: 'Staff'
  },
  claimerCategory: ClientClaimerCategory.CORE,
  financeTeamMember: {
    id: 'test',
    fullName: 'test',
    webResource: {
      url: 'test',
      text: 'text'
    }
  },
  operations: {
    updateClientAccountOwner: operationMock,
    updateClientSalesAnalyst: operationMock,
    updateClientClaimerCategory: operationMock,
    updateMatchingOperationsCoordinator: operationMock,
    updateClientRelationshipManager: operationMock,
    updateProjectRelationshipManager: operationMock,
    updateProjectDeliveryManager: operationMock,
    updateAccountManager: operationMock,
    updateProjectSalesSpecialist: operationMock,
    selectClientClaimer: operationMock,
    requestClientClaimerTransfer: operationMock,
    updateClientPartnerCategory: operationMock,
    updateClientSalesDevelopmentRepresentative: operationMock,
    updateClientEnterpriseSalesExecutive: operationMock,
    updateClientMatcher: operationMock,
    requestClientAccountManagerTransfer: operationMock,
    requestClientRelationshipManagerTransfer: operationMock,
    selectClientClientPartner: operationMock,
    updateClientClientPartner: operationMock,
    updateClientFinanceTeamMember: operationMock,
    __typename: 'ClientOperations'
  }
}
