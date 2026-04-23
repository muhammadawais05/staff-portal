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
        RemoveBillingOption: {
          data: {
            removeBillingOption: {
              success: true,
              errors: [],
              billingOption: {
                ...fixtures.MockBillingOption
              },
              __typename: 'RemoveBillingOptionPayload'
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
  it('delete last billing option', () => {
    resetSetup()

    cy.getByTestId('BillingOption-creditCard-removeBillingOption').click()

    cy.getByTestId('BillingOptionConfirmRemoval-warning').should(
      'contain',
      'This is the last pull method!'
    )
    cy.getByTestId('BillingOptionConfirmRemoval').should(
      'contain',
      'Are you sure you want to delete this payment method?'
    )
    cy.getByTestId('Confirmation-title').should(
      'contain',
      'Delete Payment Method'
    )
    cy.getByTestId('Confirmation-action')
      .should('contain', 'Delete Payment Method')
      .click()

    cy.getNotification().should(
      'contain',
      'The Payment Method has been successfully removed.'
    )
  })
})
