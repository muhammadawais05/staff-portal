import fixtures from '@staff-portal/billing/src/_fixtures'

import defaultResponses from '../../../support/defaultResponse/billingDetailsDefault'
import setupServer from '../../../support/commands/setupServer'

// TODO: remove resetSetup, once https://toptal-core.atlassian.net/browse/SPB-1966 would be resolved
// and it would be possible to update a state of the button in the previous test

const resetSetup = (overriddenResponses = {}) => {
  cy.mockGraphQL((operationName: string) =>
    setupServer({
      operationName,
      defaultResponses: {
        ...defaultResponses,
        PreferEnterpriseBillingOption: {
          data: {
            preferEnterpriseBillingOption: {
              success: true,
              errors: [],
              billingOption: fixtures.MockBillingOption,
              __typename: 'PreferEnterpriseBillingOptionPayload'
            }
          }
        },
        UnsetPreferredBillingOption: {
          data: {
            unsetPreferredBillingOption: {
              success: true,
              errors: [],
              billingOption: fixtures.MockBillingOption,
              __typename: 'UnsetPreferredBillingOptionPayload'
            }
          }
        }
      },
      overriddenResponses
    })
  )
  cy.visit('/', {
    onBeforeLoad: contentWindow => {
      contentWindow.DATA_WIDGET = 'StaffBillingDetailsWidget'
    }
  })
  cy.waitForReact()
}

describe('Billing Options', () => {
  it('sets a billing method as primary', () => {
    resetSetup()

    cy.getByTestId('BillingOption-creditCard-setPrimary').click()

    cy.get('#react_notification').should(
      'contain',
      'This payment method has been set as the primary payment method for this account.'
    )
  })

  it('unsets a primary billing method', () => {
    resetSetup({
      GetClientBillingDetails: {
        data: {
          node: {
            ...fixtures.MockClient,
            billingOptions: {
              nodes: [fixtures.MockBillingOption],
              totalCount: 1,
              __typename: 'BillingOptionInterfaceConnection'
            }
          },
          viewer: {
            permits: { canManageBillingOptions: true }
          }
        }
      }
    })

    cy.getByTestId('BillingOption-creditCard-unsetPrimary').click()
    cy.getByTestId('Confirmation-action').click()

    cy.get('#react_notification').should(
      'contain',
      'The primary payment method has been successfully removed.'
    )
  })
})
