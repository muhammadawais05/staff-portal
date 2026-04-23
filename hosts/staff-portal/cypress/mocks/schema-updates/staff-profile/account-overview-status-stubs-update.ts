import { encodeEntityId } from '@staff-portal/data-layer-service'

import { OperationValue } from '~integration/types'
import { staffProfilePageStubs } from '~integration/mocks/request-stubs'

export const updateStaffProfileAccountOverview = (
  operationValues: { [key: string]: OperationValue } | undefined = {}
) => {
  cy.stubGraphQLRequests({
    ...staffProfilePageStubs(),
    GetBillingNotes: {
      data: {
        node: {
          id: encodeEntityId('123', 'Staff'),
          billingNotes: null,
          __typename: 'Staff'
        }
      }
    },
    UpdateBillingNotes: {
      data: {
        updateBillingNotes: {
          success: true,
          errors: [],
          __typename: 'UpdateBillingNotesPayload',
          roleOrClient: {
            id: encodeEntityId('123', 'Staff'),
            billingNotes: 'test',
            __typename: 'Staff'
          }
        }
      }
    },
    GetEmployeeType: {
      data: {
        node: {
          id: encodeEntityId('123', 'Staff'),
          paymentsEmployeeType: null,
          __typename: 'Staff'
        }
      }
    },
    GetEmployeeTypeItems: {
      data: {
        rolesPaymentsEmployeeTypes: [
          'W2 Employee',
          '1099 Contractor',
          'International Contractor'
        ]
      }
    },
    UpdatePaymentsEmployeeType: {
      data: {
        updatePaymentsEmployeeType: {
          success: true,
          errors: [],
          __typename: 'UpdatePaymentsEmployeeTypePayload',
          role: {
            id: encodeEntityId('123', 'Staff'),
            paymentsEmployeeType: 'International Contractor',
            __typename: 'Staff'
          }
        }
      }
    },
    GetPayFrequency: {
      data: {
        node: {
          id: encodeEntityId('123', 'Staff'),
          paymentsFrequency: null,
          __typename: 'Staff'
        }
      }
    },
    GetPayFrequenciesItems: {
      data: {
        rolesPaymentsFrequencies: ['Semi-Monthly', 'Monthly']
      }
    },
    UpdatePaymentsFrequency: {
      data: {
        updatePaymentsFrequency: {
          success: true,
          errors: [],
          __typename: 'UpdatePaymentsFrequencyPayload',
          role: {
            id: encodeEntityId('123', 'Staff'),
            paymentsFrequency: 'Monthly',
            __typename: 'Staff'
          }
        }
      }
    },
    ...operationValues
  })
}
