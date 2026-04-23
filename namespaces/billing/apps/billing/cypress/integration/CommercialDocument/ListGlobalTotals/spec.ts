import defaultResponses from '../../../support/defaultResponse/invoiceListDefault'
import setupServer from '../../../support/commands/setupServer'

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

describe('List', () => {
  beforeEach(resetSetup)

  it('General Flow', () => {
    // Totals section
    cy.getByTestId('ListTotals-global-totals')
      .should('contain', 'Outstanding')
      .and('contain', 'Overdue')
      .and('contain', 'Disputed')
      .and('contain', 'In Collections')
      .and('contain', 'Written Off')
      .and('contain', 'Pending Receipt')
      .and('contain', 'Credited')
      .and('contain', 'Paid')
    cy.getByTestId('ListTotals-global-totals')
      .should('contain', '$19,878,148.36')
      .and('contain', '$2,025,589.53')
      .and('contain', '$16,628.32')
      .and('contain', '$1,324,378.32')
      .and('contain', '$324,378.32')
      .and('contain', '$2,324,378.32')
      .and('contain', '$4,018,088.93')
      .and('contain', '$29,314,229.54')

    // AutoComplete
    cy.getByTestId('filters-search-bar').within(() => {
      cy.get('input[autocomplete="off"]').first().type('a')
      // Filters Visibility
      cy.get('[aria-label=Filter]').click()
    })

    cy.getByTestId('filters-content-form').within(() => {
      cy.getByTestId('filters-form')
        .should('contain', 'Finance Team Member')
        .and('contain', 'Enterprise Client Partner')
        .and('contain', 'Claimer')
        .and('contain', 'Project Sales Specialist')
        .and('contain', 'Project Relationship Manager')
        .and('contain', 'Relationship Manager')
        .and('contain', 'Account Manager')

      cy.get('input[type="checkbox"][value="DISPUTED"]').click()
      cy.get('input[type="checkbox"][value="COMPANY_BILL"]').click()
      cy.url().should(
        'match',
        /\?statuses%5B%5D=DISPUTED&page=1&kinds%5B%5D=COMPANY_BILL/i
      )
    })
  })

  describe('Invoice List Page', () => {
    it('will restore selected filter options from url', () => {
      resetSetup()
      cy.visit('/?statuses%5B%5D=DISPUTED&page=1&kinds%5B%5D=COMPANY_BILL', {
        onBeforeLoad: contentWindow => {
          contentWindow.DATA_WIDGET = 'StaffInvoiceListPage'
        }
      })
      cy.waitForReact()

      cy.get('[aria-label=Filter]').click()

      cy.get('input[type="checkbox"][value="DISPUTED"]').should('be.checked')
      cy.get('input[type="checkbox"][value="COMPANY_BILL"]').should(
        'be.checked'
      )
    })
  })
})
