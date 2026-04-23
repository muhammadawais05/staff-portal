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

  cy.getByTestId('DownloadPayments')
    .should('contain', 'Download Payments')
    .trigger('mouseover', { force: true })

  cy.getTooltip()
    .should('be.visible')
    .and(
      'contain',
      'Please select a report preset from the search panel: Toptal Payments, Payoneer, or Staff Commissions.'
    )

  cy.getByTestId('PayMultipleButton').trigger('mouseout', { force: true })

  cy.tick(500)

  cy.getByTestId('CreatePaymentGroupButton')
    .should('contain', 'Create Payment Group')
    .trigger('mouseover', { force: true })

  cy.getTooltip()
    .should('be.visible')
    .and(
      'contain',
      "A payment group cannot be created from the current search results. To create a payment group, outstanding payments should be filtered by a single payee. Remember that a group can only contain payments that aren't already a part of another group."
    )

  cy.getByTestId('CreatePaymentGroupButton').trigger('mouseout', {
    force: true
  })

  cy.tick(500)
}

export { disabledActionButtonsFlow }
