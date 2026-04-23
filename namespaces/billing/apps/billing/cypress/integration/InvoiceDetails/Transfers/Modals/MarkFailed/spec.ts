import fixtures from '@staff-portal/billing/src/_fixtures'

import setupServer from '../../../../../support/commands/setupServer'
/// <reference types="cypress" />

const resetSetup = (overriddenResponses = {}) => {
  cy.mockGraphQL((operationName: string) =>
    setupServer({
      operationName,
      defaultResponses: {
        GetTransfer: {
          data: {
            node: fixtures.MockTransfer
          }
        }
      },
      overriddenResponses
    })
  )
  cy.visit('/?modal=transfer-mark-failed&node_id=589030', {
    onBeforeLoad: contentWindow => {
      contentWindow.DATA_WIDGET = 'StaffInvoiceDetailsPage'
      contentWindow.DATA_INVOICE_ID = 'VjEtSW52b2ljZS0zNzcyNDk'
      contentWindow.DATA_MODALS_ONLY = true
    }
  })
  cy.waitForReact()
}

describe('Transfers - Mark as Failed', () => {
  describe('when `operation` is enabled', () => {
    beforeEach(() => {
      resetSetup()
    })

    it('General flow', () => {
      cy.getByTestId('submit').click()
      cy.getFieldError('comment').should('exist')
      cy.getByTestId('comment').type('Some comment')
      cy.getFieldError('comment').should('not.exist')
    })
  })

  describe('when `operation` is disabled', () => {
    beforeEach(() => {
      resetSetup({
        GetTransfer: {
          data: {
            node: {
              ...fixtures.MockTransfer,
              ...{
                operations: {
                  ...fixtures.MockTransfer.operations,
                  failTransfer: {
                    __typename: 'Operation',
                    callable: 'DISABLED',
                    messages: []
                  }
                }
              }
            }
          }
        }
      })
    })

    it('modal should be closed', () => {
      cy.url().should('eq', 'http://localhost:3032/')
    })
  })
})
