/// <reference types="cypress" />

export default (id: string) => {
  return cy.get(`label[for="${id}"] ~ * [class*="FormError-error"]`)
}
