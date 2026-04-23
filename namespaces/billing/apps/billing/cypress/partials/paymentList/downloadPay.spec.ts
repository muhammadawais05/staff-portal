/// <reference types="cypress" />

const successfulFlow = () => {
  cy.getByTestId('DownloadPayments').click({ force: true })
  cy.window().its('open').should('be.called')
  cy.getNotification().should(
    'contain',
    '470 of 575 payments have been previously downloaded and will not be included in the report.'
  )
  cy.closeNotifications()
}

const failingFlow = () => {
  cy.getByTestId('DownloadPayments').click({ force: true })
  cy.getNotification().should('contain', 'Internal Server Error')
  cy.closeNotifications()
}

export { failingFlow, successfulFlow }
