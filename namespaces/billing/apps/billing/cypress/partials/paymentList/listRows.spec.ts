/// <reference types="cypress" />

const statusTooltips = () => {
  cy.contains('On hold').trigger('mouseover', { force: true })

  cy.tick(500)

  cy.getTooltip().should('be.visible').and('contain', 'until January 4, 2021')
}

export { statusTooltips }
