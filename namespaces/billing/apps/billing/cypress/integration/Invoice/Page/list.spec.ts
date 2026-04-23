/// <reference types="cypress" />

import { palette } from '@toptal/picasso/utils'
import Color from 'color'

import defaultResponses from '../../../support/defaultResponse/invoiceListDefault'
import setupServer from '../../../support/commands/setupServer'

const RED = Color(palette.red.main).toString()
const GREEN = Color(palette.green.dark).toString()
const YELLOW = Color(palette.yellow.main).toString()

const resetSetup = (overriddenResponses = {}) => {
  cy.mockGraphQL((operationName: string) =>
    setupServer({
      operationName,
      defaultResponses,
      overriddenResponses
    })
  )
  cy.visit('/', {
    onBeforeLoad: contentWindow => {
      contentWindow.DATA_WIDGET = 'StaffInvoiceListPage'
    }
  })
  cy.waitForReact()
}

describe('Invoice List flow test', () => {
  before(() => {
    resetSetup({})
  })

  describe('Month Summary', () => {
    it('has proper display', () => {
      cy.getByTestId('SummaryTagsWrapper')
        .should('have.length', 1)
        .and('contain', '$19,878,148.36')
        .and('contain', '$2,025,589.53')
        .and('contain', '$16,628.32')
        .and('contain', '$1,324,378.32')
        .and('contain', '$324,378.32')
        .and('contain', '$2,324,378.32')
        .and('contain', '$4,018,088.93')
        .and('contain', '$29,314,229.54')

      cy.getByTestId('MonthlyTotalsAmount-outstanding').should(
        'have.css',
        'color',
        YELLOW
      )
      cy.getByTestId('MonthlyTotalsAmount-overdue').should(
        'have.css',
        'color',
        RED
      )
      cy.getByTestId('MonthlyTotalsAmount-disputed').should(
        'have.css',
        'color',
        RED
      )
      cy.getByTestId('MonthlyTotalsAmount-inCollections').should(
        'have.css',
        'color',
        RED
      )
      cy.getByTestId('MonthlyTotalsAmount-writtenOff').should(
        'have.css',
        'color',
        RED
      )
      cy.getByTestId('MonthlyTotalsAmount-pendingReceipt').should(
        'have.css',
        'color',
        YELLOW
      )
      cy.getByTestId('MonthlyTotalsAmount-credited').should(
        'have.css',
        'color',
        YELLOW
      )
      cy.getByTestId('MonthlyTotalsAmount-paid').should(
        'have.css',
        'color',
        GREEN
      )
    })
  })

  describe('Invoice List header', () => {
    it('displays reconciliation button', () => {
      cy.getByTestId('reconciliation-button').click()

      cy.on('url:changed', newUrl => {
        expect(newUrl).to.contain('/invoices/reconciliation')
      })
    })
  })
})
