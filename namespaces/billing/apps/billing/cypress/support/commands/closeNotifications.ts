/// <reference types="cypress" />

export default () => {
  cy.tick(1500)
  cy.get('#react_notification').within(() => {
    cy.get('[data-component-type="button"]').click({
      force: true,
      multiple: true
    })
  })
  cy.tick(500)
}
