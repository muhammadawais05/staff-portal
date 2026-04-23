import { AnyObject } from '@toptal/picasso-forms'
import { palette } from '@toptal/picasso/utils'
import Color from 'color'
import fixtures from '@staff-portal/billing/src/_fixtures'
import { OverviewAccessLevel } from '@staff-portal/billing/src/@types/types'
import i18n from '@staff-portal/billing/src/utils/i18n'

/// <reference types="cypress" />

const {
  common: { black },
  red,
  yellow
} = palette
const BLACK = Color(black).toString()
const YELLOW = Color(yellow.main).toString()
const RED = Color(red.main).toString()

const setupServer = () => {
  cy.mockGraphQL((operationName: string, variables?: AnyObject) => {
    const mockData =
      variables?.accessLevel === OverviewAccessLevel.MyBilling
        ? fixtures.MockEntOverviewMy
        : fixtures.MockEntOverviewTeam

    switch (operationName) {
      case 'OverviewInvoices':
        return {
          mockResult: {
            data: {
              ...mockData(variables?.sinceDate)
            }
          }
        }

      case 'GetBillingOverviewDetails':
        return {
          mockResult: {
            data: {
              viewer: {
                me: {
                  manageesHaveSupervisedCompanies:
                    variables?.accessLevel !== OverviewAccessLevel.MyBilling
                }
              }
            }
          }
        }

      default:
        return {
          mockResult: {}
        }
    }
  })
}

const tooltip = () => cy.get('div [role="tooltip"]')

describe('Widget - Overview Page', () => {
  beforeEach(() => {
    cy.clock(new Date(2020, 2, 1).getTime())
    setupServer()
    cy.visit('/', {
      onBeforeLoad: contentWindow => {
        contentWindow.DATA_WIDGET = 'StaffOverviewPage'
      }
    })
    cy.waitForReact()
  })

  describe('Invoice summaries', () => {
    it('For `This Quarter`, displays the right invoice summaries', () => {
      cy.getByTestId('EntOverviewBillingSummaryPeriod').click()
      cy.contains(
        'li[role="option"]',
        i18n.t('entOverview:billing.summary.dateFilter.quarter') as string
      ).click({ force: true })

      const summaryItems = () =>
        cy
          .getByTestId('EntOverviewBillingSummary')
          .findByTestId('EntOverviewBillingSummaryItem')

      summaryItems()
        .should('have.length', 4)
        .eq(0)
        .should('contain', '$0.00')
        .and('contain', 'Disputed')

      summaryItems().eq(1).should('contain', '$0.00').and('contain', 'Overdue')

      summaryItems()
        .eq(2)
        .should('contain', '$1,128,988.25')
        .and('contain', 'Outstanding')

      summaryItems()
        .eq(3)
        .should('contain', '$315,715.00')
        .and('contain', 'Paid')
    })

    it('For `Current Year`, displays the right invoice summaries', () => {
      cy.getByTestId('EntOverviewBillingSummaryPeriod').click()
      cy.contains(
        'li[role="option"]',
        i18n.t('entOverview:billing.summary.dateFilter.year') as string
      ).click({ force: true })

      const summaryItems = () =>
        cy
          .getByTestId('EntOverviewBillingSummary')
          .findByTestId('EntOverviewBillingSummaryItem')

      summaryItems()
        .should('have.length', 4)
        .eq(0)
        .should('contain', '$0.00')
        .and('contain', 'Disputed')

      summaryItems().eq(1).should('contain', '$0.00').and('contain', 'Overdue')

      summaryItems()
        .eq(2)
        .should('contain', '$1,128,988.25')
        .and('contain', 'Outstanding')

      summaryItems()
        .eq(3)
        .should('contain', '$315,715.00')
        .and('contain', 'Paid')
    })

    it('For `All Time`, displays the right invoice summaries', () => {
      cy.getByTestId('EntOverviewBillingSummaryPeriod').click()
      cy.contains(
        'li',
        i18n.t('entOverview:billing.summary.dateFilter.all') as string
      ).click({ force: true })

      const summaryItems = () =>
        cy
          .getByTestId('EntOverviewBillingSummary')
          .findByTestId('EntOverviewBillingSummaryItem')

      summaryItems()
        .should('have.length', 4)
        .eq(0)
        .should('contain', '$0.00')
        .and('contain', 'Disputed')

      summaryItems()
        .eq(1)
        .should('contain', '$752,527.50')
        .and('contain', 'Overdue')

      summaryItems()
        .eq(2)
        .should('contain', '$5,351,644.22')
        .and('contain', 'Outstanding')

      summaryItems()
        .eq(3)
        .should('contain', '$11,790,147.45')
        .and('contain', 'Paid')
    })
  })

  describe('`My Billing` Filter', () => {
    it('Display the most recently disputed invoices', () => {
      const table = () =>
        cy.getByTestId('EntOverviewBillingInvoicesTable').eq(0)

      const rows = (...args) => table().findByTestId('$=-row', ...args)

      rows().should('have.length', 0)
    })

    it('Display the longest overdue invoices', () => {
      const table = () =>
        cy.getByTestId('EntOverviewBillingInvoicesTable').eq(1)

      const rows = (...args) => table().findByTestId('$=-row', ...args)

      rows().should('have.length', 4)

      const row = () => rows().eq(2)
      const cells = (...args) => row().findByTestId('$=-cell', ...args)

      cells(':eq(0)').should('contain', 'Weber, Smitham and Lehner')

      cells(':eq(1)').should('contain', '9 months ago')

      cells(':eq(4) a')
        .invoke('attr', 'href')
        .should('contain', '/platform/staff/company_representatives/1111247')
    })

    it('Display the POs closest to expiration', () => {
      const table = () =>
        cy.getByTestId('EntOverviewBillingPurchaseOrdersTable').eq(0)

      const rows = (...args) => table().findByTestId('$=-row', ...args)

      rows().should('have.length', 5)

      const row = () => rows().eq(1)
      const cells = (...args) => row().findByTestId('$=-cell', ...args)

      cells(':eq(5) span')
        .should('contain', '$637,330.00')
        .and('have.css', 'color', YELLOW)

      rows()
        .eq(2)
        .findByTestId('$=-cell', ':eq(5) span')
        .should('contain', '$77,520.00')
        .and('have.css', 'color', BLACK)
    })

    it('Display the POs closest to limit', () => {
      const table = () =>
        cy.getByTestId('EntOverviewBillingPurchaseOrdersTable').eq(1)

      const rows = (...args) => table().findByTestId('$=-row', ...args)

      rows().should('have.length', 5)

      const row = () => rows().eq(3)
      const cells = (...args) => row().findByTestId('$=-cell', ...args)

      cells(':eq(1) span')
        .should('contain', '-$5,760.00')
        .and('have.css', 'color', RED)
    })

    it('Display the five longest overdue timesheets', () => {
      const table = () =>
        cy.getByTestId('EntOverviewBillingTimesheetsTable').eq(0)

      const rows = (...args) => table().findByTestId('$=-row', ...args)

      rows().should('have.length', 0)
    })
  })

  describe('`Team Billing` Filter (and tooltips)', () => {
    beforeEach(() => {
      cy.get('[data-testid=tab-team-billing]').click()
    })

    it('Display the most recently disputed invoices', () => {
      const table = () =>
        cy.getByTestId('EntOverviewBillingInvoicesTable').eq(0)

      const rows = (...args) => table().findByTestId('$=-row', ...args)

      rows().should('have.length', 5)

      const row = () => rows().eq(4)
      const cells = (...args) => row().findByTestId('$=-cell', ...args)

      cells(':eq(0) a')
        .should('contain', 'Schimmel-Wolf XZ')
        .trigger('mouseover', { force: true })
        .invoke('attr', 'href')
        .should('contain', '/platform/staff/companies/1476747')

      cy.tick(1000)

      tooltip()
        .should('be.visible')
        .invoke('text')
        .should('contain', 'Schimmel-Wolf XZ')

      cy.tick(50)

      cells(':eq(4) a')
        .trigger('mouseover', { force: true })
        .invoke('attr', 'href')
        .should('contain', '/platform/staff/company_representatives/1479046')

      cy.tick(1000)

      tooltip()
        .should('be.visible')
        .invoke('text')
        .should('contain', 'Jacquiline Frami')

      cy.tick(50)
    })

    it('Display the longest overdue invoices', () => {
      const table = () =>
        cy.getByTestId('EntOverviewBillingInvoicesTable').eq(1)

      const rows = (...args) => table().findByTestId('$=-row', ...args)

      rows().should('have.length', 5)

      const row = () => rows().eq(3)
      const cells = (...args) => row().findByTestId('$=-cell', ...args)

      cells(':eq(1)').should('contain', '1 year ago')

      cells(':eq(6)').should('contain', '$6,800.00')

      cells(':eq(3) a')
        .should('contain', 'Chief Research Developer (141716)')
        .trigger('mouseover', { force: true })
        .invoke('attr', 'href')
        .should('contain', '/platform/staff/jobs/141716')

      cy.tick(1000)

      tooltip()
        .should('be.visible')
        .invoke('text')
        .should('contain', 'Chief Research Developer (141716)')

      cy.tick(50)
    })

    it('Display the POs closest to expiration', () => {
      const table = () =>
        cy.getByTestId('EntOverviewBillingPurchaseOrdersTable').eq(0)

      const rows = (...args) => table().findByTestId('$=-row', ...args)

      rows().should('have.length', 5)

      const row = () => rows().eq(4)
      const cells = (...args) => row().findByTestId('$=-cell', ...args)

      cells(':eq(1) p')
        .should('contain', 'Dec 31, 2020')
        .and('have.css', 'color', RED)

      cells(':eq(2) a')
        .should('contain', '994176585')
        .invoke('attr', 'href')
        .should('contain', '/platform/staff/purchase_orders/1771')
      cells(':eq(5) span')
        .should('contain', '$24,310.00')
        .and('have.css', 'color', YELLOW)
    })

    it('Display the POs closest to limit', () => {
      const table = () =>
        cy.getByTestId('EntOverviewBillingPurchaseOrdersTable').eq(1)

      const rows = (...args) => table().findByTestId('$=-row', ...args)

      rows().should('have.length', 5)

      const row = () => rows().eq(2)
      const cells = (...args) => row().findByTestId('$=-cell', ...args)

      cells(':eq(1) span')
        .should('contain', '-$8,828.76')
        .and('have.css', 'color', RED)

      cells(':eq(5) p').should('contain', '')

      const row2 = () => rows().eq(4)
      const cells2 = (...args) => row2().findByTestId('$=-cell', ...args)

      cells2(':eq(5) p')
        .should('contain', 'Dec 31, 2019')
        .and('have.css', 'color', RED)
    })

    it('Display the longest overdue timesheets', () => {
      const table = () =>
        cy.getByTestId('EntOverviewBillingTimesheetsTable').eq(0)

      const rows = (...args) => table().findByTestId('$=-row', ...args)

      rows().should('have.length', 5)

      const row = () => rows().eq(2)
      const cells = (...args) => row().findByTestId('$=-cell', ...args)

      cells(':eq(0) a')
        .should('contain', 'Schaden-Mueller WZ')
        .trigger('mouseover', { force: true })
        .invoke('attr', 'href')
        .should('contain', '/platform/staff/companies/655264')

      cy.tick(1000)

      tooltip()
        .should('be.visible')
        .invoke('text')
        .should('contain', 'Schaden-Mueller WZ')

      cy.tick(50)

      cells(':eq(3) a')
        .trigger('mouseover', { force: true })
        .invoke('attr', 'href')
        .should('contain', '/platform/staff/talents/338116')

      cy.tick(1000)

      tooltip()
        .should('be.visible')
        .invoke('text')

        .should('contain', 'Vincenza Hettinger')

      cy.tick(50)

      cells(':eq(4) a')
        .trigger('mouseover', { force: true })
        .invoke('attr', 'href')
        .should('contain', '/platform/staff/staff/420287')

      cy.tick(1000)

      tooltip()
        .should('be.visible')
        .invoke('text')
        .should('contain', 'Ivan Radigales Creus')

      cy.tick(50)
    })
  })
})
