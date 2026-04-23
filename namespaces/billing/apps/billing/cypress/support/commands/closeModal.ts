/// <reference types="cypress" />

export default () => {
  cy.getByTestId('cancel').click()
  cy.tick(500)
}
