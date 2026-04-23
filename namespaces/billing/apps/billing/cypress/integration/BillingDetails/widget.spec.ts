import { palette } from '@toptal/picasso/utils'
import Color from 'color'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import fixtures from '@staff-portal/billing/src/_fixtures'

import defaultResponses from '../../support/defaultResponse/billingDetailsDefault'
import setupServer from '../../support/commands/setupServer'

const GREEN = Color(palette.green.dark).toString()

// TODO: remove resetSetup, once https://toptal-core.atlassian.net/browse/SPB-1966 would be resolved
// and it would be possible to update a state of the button in the previous test
const billingOption = {
  ...fixtures.MockClient.billingOptions.nodes[0],
  operations: {
    __typename: 'ClientOperations',
    reverifyCreditCardBillingOption: {
      __typename: 'Operation',
      callable: OperationCallableTypes.HIDDEN,
      messages: []
    },
    preferEnterpriseBillingOption: {
      __typename: 'Operation',
      callable: OperationCallableTypes.HIDDEN,
      messages: []
    },
    unsetPreferredBillingOption: {
      __typename: 'Operation',
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    removeBillingOption: {
      __typename: 'Operation',
      callable: OperationCallableTypes.HIDDEN,
      messages: []
    },
    removeEnterpriseBillingOption: {
      __typename: 'Operation',
      callable: OperationCallableTypes.HIDDEN,
      messages: []
    }
  }
}

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
              billingOption,
              __typename: 'PreferEnterpriseBillingOptionPayload'
            }
          }
        },
        UnsetPreferredBillingOption: {
          data: {
            unsetPreferredBillingOption: {
              success: true,
              errors: [],
              billingOption,
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

describe('Billing Details Widget', () => {
  beforeEach(() => {
    resetSetup()
  })

  describe('Billing Options', () => {
    it('renders Billing Option properly', () => {
      cy.getByTestId('item-field-label__wrapper').should('contain', 'Name')

      cy.getByTestId('item-field-value__wrapper').should(
        'contain',
        'John Talbot'
      )

      cy.getByTestId('item-field-label__wrapper').should('contain', 'Number')

      cy.getByTestId('item-field-value__wrapper').should(
        'contain',
        '**** **** **** 1324'
      )

      cy.getByTestId('item-field-label__wrapper').should('contain', 'Expires')

      cy.getByTestId('item-field-value__wrapper').should('contain', '12/2015')

      cy.getByTestId('item-field-label__wrapper').should('contain', 'Type')

      cy.getByTestId('item-field-value__wrapper').should(
        'contain',
        'MasterCard'
      )

      cy.getByTestId('item-field-label__wrapper').should(
        'contain',
        'Verification Status'
      )

      cy.getByTestId('item-field-value__wrapper').should('contain', 'Verified')

      cy.getByTestId('VerificationStatus-label').should(
        'have.css',
        'color',
        GREEN
      )
    })

    it('sets a billing method as primary', () => {
      cy.getByTestId('BillingOption-creditCard-setPrimary').click()

      cy.getNotification().should(
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
                nodes: [billingOption],
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

      cy.getNotification().should(
        'contain',
        'The primary payment method has been successfully removed.'
      )
    })
  })
})
