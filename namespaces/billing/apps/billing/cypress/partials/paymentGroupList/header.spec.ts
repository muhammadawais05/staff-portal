/// <reference types="cypress" />

const disabledActionButtonsFlow = () => {
  cy.getByTestId('PayMultipleButton')
    .should('contain', 'Pay Multiple')
    .trigger('mouseover', { force: true })

  cy.getTooltip()
    .should('be.visible')
    .and(
      'contain',
      'To pay multiple payments, they should be filtered by Due/Overdue status.'
    )

  cy.getByTestId('PayMultipleButton').trigger('mouseout', { force: true })

  cy.tick(500)

  cy.getByTestId('PayMultipleButton').trigger('mouseout', { force: true })

  cy.tick(500)
}

export { disabledActionButtonsFlow }
