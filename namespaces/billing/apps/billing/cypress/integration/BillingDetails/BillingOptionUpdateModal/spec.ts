import { pick } from 'lodash-es'
import fixtures from '@staff-portal/billing/src/_fixtures'

import defaultResponses from '../../../support/defaultResponse/billingDetailsDefault'
import setupServer from '../../../support/commands/setupServer'

const resetSetup = (overriddenResponses = {}) => {
  cy.mockGraphQL((operationName: string) =>
    setupServer({
      operationName,
      defaultResponses: {
        ...defaultResponses,
        GetBillingOptionUpdate: {
          data: {
            node: pick(fixtures.MockClient, [
              '__typename',
              'id',
              'billingOptions'
            ]),
            viewer: {
              permits: { canManageBillingOptions: true }
            }
          }
        },
        SetUpdateBillingOption: {
          data: {
            updateBillingOption: {
              success: true,
              errors: [],
              __typename: 'UpdateBillingOptionPayload'
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

describe('BillingOptionUpdateModal', () => {
  before(() => {
    resetSetup()
  })

  describe('Wire billing option', () => {
    it('initial values are set properly', () => {
      cy.getByTestId('BillingOption-wire-update').click()

      cy.getByTestId('BillingOptionUpdateModalForm-nameOnAccount')
        .find('input')
        .should('have.value', 'Account name')
      cy.getByTestId('BillingOptionUpdateModalForm-bankName')
        .find('input')
        .should('have.value', 'Bank name')
    })

    it('displays an error if account name field is empty', () => {
      cy.getByTestId('BillingOptionUpdateModalForm-nameOnAccount')
        .find('input')
        .clear()

      cy.getByTestId('submit').click()

      cy.getFieldError('nameOnAccount').should(
        'contain',
        'Please complete this field.'
      )
    })

    it('displays an error if bank name field is empty', () => {
      cy.getByTestId('BillingOptionUpdateModalForm-bankName')
        .find('input')
        .clear()

      cy.getByTestId('submit').click()

      cy.getFieldError('bankName').should(
        'contain',
        'Please complete this field.'
      )
    })

    it('displays a success notification', () => {
      cy.getByTestId('BillingOptionUpdateModalForm-nameOnAccount')
        .find('input')
        .type('New name on account')
      cy.getByTestId('BillingOptionUpdateModalForm-bankName')
        .find('input')
        .type('New bank name')

      cy.getByTestId('submit').click()

      cy.getNotification().should(
        'contain',
        'The Billing Option was successfully updated.'
      )
    })
  })

  describe('Paypal billing option', () => {
    it('initial values are set properly', () => {
      cy.getByTestId('BillingOption-paypal-update').click()

      cy.getByTestId('BillingOptionUpdateModalForm-username')
        .find('input')
        .should('have.value', 'paypal@toptal.com')
      cy.getByTestId('BillingOptionUpdateModalForm-businessName')
        .find('input')
        .should('have.value', 'Paypal business name')
    })

    it('displays an error if username field is empty', () => {
      cy.getByTestId('BillingOptionUpdateModalForm-username')
        .find('input')
        .clear()

      cy.getByTestId('submit').click()

      cy.getFieldError('username').should(
        'contain',
        'Please complete this field.'
      )
    })

    it('displays an error if business name field is empty', () => {
      cy.getByTestId('BillingOptionUpdateModalForm-businessName')
        .find('input')
        .clear()

      cy.getByTestId('submit').click()

      cy.getFieldError('businessName').should(
        'contain',
        'Please complete this field.'
      )
    })

    it('displays a success notification', () => {
      cy.getByTestId('BillingOptionUpdateModalForm-username')
        .find('input')
        .type('newusername@toptal.com')
      cy.getByTestId('BillingOptionUpdateModalForm-businessName')
        .find('input')
        .type('New business name')

      cy.getByTestId('submit').click()

      cy.getNotification().should(
        'contain',
        'The Billing Option was successfully updated.'
      )
    })
  })
})
