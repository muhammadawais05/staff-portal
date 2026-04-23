import fixtures from '@staff-portal/billing/src/_fixtures'

import setupServer from '../../../support/commands/setupServer'
import defaultResponses from '../../../support/defaultResponse/invoiceDetailsDefault'
/// <reference types="cypress" />

describe('Widget - Staff - Invoice Details', () => {
  describe('Dispute Modal', () => {
    beforeEach(() => {
      cy.clock(new Date(2020, 1, 12).getTime())
      cy.mockGraphQL((operationName: string) =>
        setupServer({
          operationName,
          defaultResponses
        })
      )
      cy.visit(
        '/?node_id=377249&node_type=invoice&modal=commercial-document-dispute-request',
        {
          onBeforeLoad: contentWindow => {
            contentWindow.DATA_WIDGET = 'StaffInvoiceDetailsPage'
            contentWindow.DATA_INVOICE_ID = fixtures.MockInvoice.id
            contentWindow.DATA_MODALS_ONLY = true
          }
        }
      )
      cy.waitForReact()
    })

    it('proper behavior', () => {
      // proper title
      cy.getByTestId('DisputeForm-title').contains('Dispute Invoice #377249')

      // `actionDueOn` field
      cy.get('#actionDueOn').focused()

      cy.get('#actionDueOn').blur()
      cy.getFieldError('actionDueOn').should(
        'contain',
        'Please complete this field.'
      )

      // TODO : restore after Picasso past date validation will be fixed https://github.com/toptal/picasso/issues/1458
      // cy.getByTestId('actionDueOn')
      //   .clear()
      //   .type('2020-02-11')
      //   .blur()
      // cy.getFieldError('actionDueOn').should('contain',
      //   i18n.t('common:validation.todayOrLater')
      // )

      cy.get('#actionDueOn').click()
      cy.get('[data-simple-react-calendar-day="2020-02-12"]').click()
      cy.getFieldError('actionDueOn').should('not.exist')

      cy.get('#actionDueOn').focus().clear().type('2021-02-13').blur()

      // `comment` field

      cy.get('#comment').focus().blur()
      cy.getFieldError('comment').should(
        'contain',
        'Please complete this field.'
      )
      cy.get('#comment').focus().clear().type('This is an example').blur()
    })
  })

  describe('Dispute Update Modal', () => {
    beforeEach(() => {
      cy.clock(new Date(2020, 1, 12).getTime())
      cy.mockGraphQL((operationName: string) =>
        setupServer({
          operationName,
          defaultResponses
        })
      )
      cy.visit(
        '/?node_id=377249&node_type=invoice&modal=invoice-dispute-update',
        {
          onBeforeLoad: contentWindow => {
            contentWindow.DATA_WIDGET = 'StaffInvoiceDetailsPage'
            contentWindow.DATA_INVOICE_ID = fixtures.MockInvoice.id
          }
        }
      )
      cy.waitForReact()
    })

    it('has the proper title', () => {
      cy.getByTestId('DisputeForm-title').should(
        'contain',
        'Dispute Invoice #377249'
      )
    })

    it('`actionDueOn` field', () => {
      cy.getByTestId('actionDueOn').focused()

      cy.get('#actionDueOn').blur()
      cy.getFieldError('actionDueOn').should(
        'contain',
        'Please complete this field.'
      )

      // TODO : restore after Picasso past date validation will be fixed https://github.com/toptal/picasso/issues/1458
      // cy.getByTestId('actionDueOn')
      //   .clear()
      //   .type('2020-02-11')
      //   .blur()
      // cy.getFieldError('actionDueOn').should('contain',
      //   i18n.t('common:validation.todayOrLater')
      // )

      cy.get('#actionDueOn').focus().clear().type('2021-02-13').blur()
    })

    it('`comment` field', () => {
      cy.get('#comment').focus().blur()
      cy.getFieldError('comment').should(
        'contain',
        'Please complete this field.'
      )
      cy.get('#comment').focus().clear().type('This is an example').blur()
    })
  })
})
