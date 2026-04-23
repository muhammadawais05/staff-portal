/// <reference types="cypress" />

const successfulFlow = () => {
  cy.getByTestId('CreatePaymentGroupButton').click()
  cy.tick(500)

  cy.get('[data-testid=Confirmation]')
    .should('exist')
    .within(() => {
      cy.contains('Create Payment Group').click()
    })
  cy.location('pathname').should('eq', '/payment_groups/123456')
}

const failingFlow = () => {
  cy.getByTestId('CreatePaymentGroupButton').click({ force: true })

  cy.get('[data-testid=Confirmation]')
    .should('exist')
    .within(() => {
      cy.contains('Create Payment Group').click()
    })
  cy.get('#react_notification').should('contain', 'Something went wrong.')
  cy.get('[data-testid=Confirmation]').should('exist')
  cy.contains('Cancel').click()
  cy.tick(500)
}

export { successfulFlow, failingFlow }
