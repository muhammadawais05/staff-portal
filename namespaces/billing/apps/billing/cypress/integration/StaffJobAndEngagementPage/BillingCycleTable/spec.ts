import { palette } from '@toptal/picasso/utils'
import Color from 'color'
import fixtures from '@staff-portal/billing/src/_fixtures'

import setupServer from '../../../support/commands/setupServer'
import defaultResponses from '../../../support/defaultResponse/billingCyclesDefault'

const SELECTOR_BILLING_CYCLE_TABLE_ROW = 'BillingCycleTableRow'
const SELECTOR_TOTAL_PAID_COMPANY = 'total-paid-company'
const SELECTOR_TOTAL_PAID = 'total-paid'
const SELECTOR_TOTAL_PAID_COMMISSIONS = 'total-paid-commissions'
const SELECTOR_TOTAL_PAID_TALENT = 'total-paid-talent'

const GREEN = Color(palette.green.dark).toString()
const YELLOW = Color(palette.yellow.main).toString()
const RED = Color(palette.red.main).toString()

const getRows = () =>
  cy.get(`[data-testid="${SELECTOR_BILLING_CYCLE_TABLE_ROW}"]`)
const tooltip = () => cy.get('div [role="tooltip"]')

type AmountIdType = 'invoice' | 'commission' | 'payment'

interface GetRowAmountTooltipHelper {
  row: number
  type: AmountIdType
  text: string
}

const getAmountSelector = (type: 'invoice' | 'commission' | 'payment') => {
  switch (type) {
    case 'commission':
      return 'BillingCycleTableRow-commissions-commission-amount'

    case 'payment':
      return 'BillingCycleTableRow-payments-item_0'

    case 'invoice':
    default:
      return 'BillingCycleTableRow-invoices-item_0-amount'
  }
}

interface GetRowAmountColorHelper {
  row: number
  type?: AmountIdType
  color: string
}

const getRowAmountColorHelper = ({
  row,
  type = 'invoice',
  color
}: GetRowAmountColorHelper) => {
  const elementId = getAmountSelector(type as AmountIdType)

  getRows()
    .eq(row)
    .within(() =>
      cy.getByTestId(elementId).should('have.css', 'color').and('equal', color)
    )
}

const getRowAmountTooltipHelper = ({
  row,
  type = 'invoice',
  text
}: GetRowAmountTooltipHelper) => {
  const elementId = getAmountSelector(type as AmountIdType)

  getRows()
    .eq(row)
    .within(() => {
      cy.getByTestId(elementId).trigger('mouseover')
    })

  cy.tick(200)

  tooltip().should('be.visible').invoke('text').should('contain', text)

  getRows()
    .eq(row)
    .within(() => {
      cy.getByTestId(elementId).trigger('mouseout')
    })

  cy.tick(50)
}

const resetSetup = (overriddenResponses = {}) => {
  cy.mockGraphQL((operationName: string) =>
    setupServer({
      operationName,
      defaultResponses,
      overriddenResponses
    })
  )
  cy.clock()

  cy.visit('/', {
    onBeforeLoad: contentWindow => {
      contentWindow.DATA_WIDGET = 'StaffEngagementPage'
      contentWindow.DATA_ENGAGEMENT_ID = 'VjEtRW5nYWdlbWVudC0xNzE2MDg'
    }
  })
  cy.waitForReact()
}

describe('Widget - Staff - Jobs and Engagement Page - BillingCycleTable', () => {
  describe('BillingCycleTable with billing cycles', () => {
    before(() => {
      resetSetup()
    })

    describe('Marking entries', () => {
      it('Marks entry as `outstanding` by the yellow color', () => {
        getRowAmountColorHelper({ color: YELLOW, row: 2 })
      })

      it('Marks entry as `overdue` by the red color', () => {
        getRowAmountColorHelper({ color: RED, row: 6, type: 'commission' })
      })

      it('Marks entry as `paid` by the green color', () => {
        getRowAmountColorHelper({ color: GREEN, row: 4 })
      })

      it('Marks entry as `not issued`', () => {
        getRows()
          .eq(0)
          .within(() => {
            cy.getByTestId('invoices').should('have.text', 'Not issued yet')
          })
      })

      it('Marks entry as `not issued` by striking through the text', () => {
        getRows()
          .eq(5)
          .within(() => {
            cy.get('[data-testid="start-date"] p').should(
              'have.css',
              'text-decoration',
              'line-through solid rgb(196, 198, 202)'
            )
          })
      })
    })

    it('Tooltips', () => {
      // 'Shows a tooltip over `outstanding` Company property'
      getRowAmountTooltipHelper({
        row: 2,
        text: 'Outstanding, Jacobs, Nikolaus and Leuschke'
      })
      // 'Shows a tooltip over `paid` Talent property'
      getRowAmountTooltipHelper({
        row: 6,
        text: 'Paid, Hye Stracke',
        type: 'payment'
      })
      // 'Shows a tooltip over `overdue` Commission property'
      // getRowAmountTooltipHelper({ text: 'Overdue', row: 6, type: 'commission' })
      // 'Shows a tooltip over `Paid` Company property'
      getRowAmountTooltipHelper({
        row: 12,
        text: 'Paid, Jacobs, Nikolaus and LeuschkeThere are adjustments made to the original invoices'
      })

      // 'Does not show tooltip over `Talent` payment that represents a consolidated cycle'
      getRows()
        .eq(4)
        .within(() => {
          cy.getByTestId('BillingCycleTableRow-payments-item_0-amount').trigger(
            'mouseover'
          )
        })

      cy.tick(200)

      tooltip().should('not.exist')
    })

    describe('Navigation links', () => {
      it('Navigates to the `invoices` of the old UI when clicking the `outstanding` Company property', () => {
        cy.getByTestId('BillingCycleTableRow-invoices-item_0-link')
          .first()
          .invoke('attr', 'href')
          .should(
            'contain',
            'http://localhost:3000/platform/staff/invoices/411187'
          )
      })

      it('Navigates to the `payments` of the old UI when clicking the `due` talent property', () => {
        cy.getByTestId('BillingCycleTableRow-payments-item_0-link')
          .eq(1)
          .invoke('attr', 'href')
          .should(
            'contain',
            'http://localhost:3000/platform/staff/payments/966526'
          )
      })
    })

    describe('Total amounts are calculated properly', () => {
      it('Total hours', () => {
        cy.get(`[data-testid="${SELECTOR_TOTAL_PAID}"]`)
          .invoke('text')
          .should('eq', '1,984')
      })

      it('Total Company', () => {
        cy.get(`[data-testid="${SELECTOR_TOTAL_PAID_COMPANY}"]`)
          .invoke('text')
          .should('eq', '$155,040.00')
      })

      it('Total Talent', () => {
        cy.get(`[data-testid="${SELECTOR_TOTAL_PAID_TALENT}"]`)
          .invoke('text')
          .should('eq', '$93,392.00')
      })

      it('Total Commissions', () => {
        cy.get(`[data-testid="${SELECTOR_TOTAL_PAID_COMMISSIONS}"]`)
          .invoke('text')
          .should('eq', '$7,543.80')
      })
    })
  })

  describe('BillingCycleTable with no billing cycles', () => {
    before(() => {
      resetSetup({
        GetBillingCycles: {
          data: {
            engagementDocuments:
              fixtures.MockBillingCyclesTable.engagementDocuments,
            node: {
              ...fixtures.MockBillingCyclesTable.node,
              billingCycles: {
                __typename: 'BillingCyclesConnection',
                nodes: []
              }
            }
          }
        }
      })

      cy.visit('/', {
        onBeforeLoad: contentWindow => {
          contentWindow.DATA_WIDGET = 'StaffEngagementPage'
          contentWindow.DATA_ENGAGEMENT_ID = 'VjEtRW5nYWdlbWVudC0xNzE2MDg'
        }
      })
      cy.waitForReact()
    })

    it('display the BillingCycleTableEmpty component', () => {
      cy.get(`[data-testid="BillingCycleTable"]`).should('have.length', 0)

      cy.get(`[data-testid="BillingCycleTableEmpty"]`).should('have.length', 1)
    })
  })
})
