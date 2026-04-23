import defaultResponses from '../../support/defaultResponse/receivedPaymentsDefault'
import setupServer from '../../support/commands/setupServer'

const resetSetup = (overriddenResponses = {}) => {
  cy.clock(new Date(2020, 2, 1).getTime())
  cy.mockGraphQL((operationName: string) =>
    setupServer({
      operationName,
      defaultResponses,
      overriddenResponses
    })
  )
  cy.visit('/', {
    onBeforeLoad: contentWindow => {
      contentWindow.DATA_WIDGET = 'StaffReceivedPaymentsPage'
    }
  })
  cy.waitForReact()
}

describe('Received Payments Page', () => {
  before(resetSetup)

  it('History payments modal is shown', () => {
    cy.getByTestId('payments-history').click()
    cy.getByTestId('ModalsState-receivedPaymentsHistory')
  })

  it('Displays notification with link after submit', () => {
    cy.getByTestId('day-button-1').first().click()
    cy.get('#endDate').click()
    cy.getByTestId('day-button-1').first().click()
    cy.getByTestId('submit').click()

    cy.get('#react_notification')
      .within(() => {
        cy.get('a').should('have.attr', 'href', '#')
      })
      .should(
        'have.text',
        "Your download should begin momentarily. Please do not refresh the page. If for some reason the download doesn't initiate, please click this link to download the document manually."
      )
      .within(() => {
        cy.get('[data-component-type="button"]').click()
      })
  })

  it('Download commissions modal is shown', () => {
    cy.getByTestId('download-commissions').click()
    cy.getByTestId('ModalsState-receivedPaymentsCommissions')
  })

  it('Displays notification with link after download commissions submit', () => {
    cy.get('[type="radio"]').last().check({ force: true })
    cy.getByTestId('submit').click()

    cy.get('#react_notification')
      .last()
      .within(() => {
        cy.get('a').should('have.attr', 'href', '#')
        cy.get('[data-component-type="button"]').last().click()
      })
  })
})
