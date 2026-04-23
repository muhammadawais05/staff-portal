/// <reference types="cypress" />
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'

import setupServer from '../../support/commands/setupServer'
import defaultResponses from '../../support/defaultResponse/purchaseOrderLineDetailsDefault'

const resetSetup = (overriddenResponses = {}) => {
  cy.mockGraphQL((operationName: string) =>
    setupServer({
      operationName,
      defaultResponses,
      overriddenResponses
    })
  )

  cy.visit(`/2004`, {
    onBeforeLoad: contentWindow => {
      contentWindow.DATA_WIDGET = 'StaffPurchaseOrderLineDetailsPage'
    }
  })
  cy.waitForReact()
}

describe('Purchase Order Line Details spec', () => {
  before(resetSetup)

  describe('Job section', () => {
    it('renders properly', () => {
      cy.getByTestId('JobsList').should('exist')
    })

    describe('When the PO line is directly set at only the job-level', () => {
      it('we show the Job ID for that row and keep the Engagement ID blank', () => {
        cy.getByTestId('JobsList').within(() => {
          cy.get('tbody tr')
            .first()
            .within(() => {
              cy.get('td').eq(0).should('have.text', '#250231')
              cy.get('td').eq(1).should('have.text', '')
            })
        })
      })
    })

    describe('If the PO line is directly set at only the engagement-level', () => {
      it('we show the Engagement ID for that row and keep the Job ID blank', () => {
        cy.getByTestId('JobsList').within(() => {
          cy.get('tbody tr')
            .eq(1)
            .within(() => {
              cy.get('td').eq(0).should('have.text', '')
              cy.get('td').eq(1).should('have.text', '#264504')
            })
        })
      })
    })

    describe('When the PO line is directly set at both the engagement-level', () => {
      it('we show both the Engagement ID and the Job ID', () => {
        cy.getByTestId('JobsList').within(() => {
          cy.get('tbody tr')
            .last()
            .within(() => {
              cy.get('td').eq(0).should('have.text', '#248444')
              cy.get('td').eq(1).should('have.text', '#262158')
            })
        })
      })
    })
  })
  describe('Purchase Order Line Details', () => {
    it('has correct initial values', () => {
      cy.getByTestId('content-title').should(
        'have.text',
        'Purchase Order Line #2004 '
      )
    })

    it('shows all the pagination control elements', () => {
      cy.getByTestId('InvoiceListRow').should('have.length', 25)

      cy.getByTestId('pagination').within(() => {
        cy.get('button').contains('Prev')
        cy.get('button').contains('Next')
      })
    })

    describe('when editing fields', () => {
      it('displays the previously setted value', () => {
        cy.getByTestId('EditableField-toggle-button-amount').click()
        cy.getByTestId('EditableField-amount-editor')
          .find('input')
          .should('have.value', '100.0')

        cy.getByTestId('EditableField-toggle-button-threshold').click()
        cy.getByTestId('EditableField-threshold-editor')
          .find('input')
          .should('have.value', '10')

        cy.getByTestId('EditableField-toggle-button-expiryDate').click()
        cy.getByTestId('EditableField-expiryDate-editor')
          .find('input')
          .should('have.value', '2022-05-05')
      })

      it('submits decimal amount and threshold', () => {
        cy.getByTestId('EditableField-toggle-button-amount').click()
        cy.getByTestId('EditableField-amount-editor')
          .find('input')
          .clear()
          .type('5.12')

        // check if HTML5 validation comes up. True means it doesn't
        cy.get('form')
          .first()
          .should($form => expect($form[0].checkValidity()).to.be.true)

        cy.getByTestId('EditableField-toggle-button-threshold').click()
        cy.getByTestId('EditableField-threshold-editor')
          .find('input')
          .clear()
          .type('2.23')

        // check if HTML5 validation comes up. True means it doesn't
        cy.get('form')
          .last()
          .should(
            $form =>
              expect(($form[0] as HTMLFormElement).checkValidity()).to.be.true
          )
      })
    })

    describe('when nil values are present', () => {
      before(() =>
        resetSetup({
          GetPurchaseOrderLineDetails: {
            data: {
              node: {
                ...defaultResponses.GetPurchaseOrderLineDetails.data.node,
                expiryDate: null,
                threshold: null,
                totalAmount: null
              }
            }
          }
        })
      )

      it('displays empty data for amount, threshold and expiration date', () => {
        cy.getByTestId('amount').should('have.text', EMPTY_DATA)
        cy.getByTestId('threshold').should('have.text', EMPTY_DATA)
        cy.getByTestId('expiryDate').should('have.text', EMPTY_DATA)
      })
    })
  })
})
