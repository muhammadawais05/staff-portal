/// <reference types="cypress" />

const basicFunctionality = () => {
  cy.get('[aria-label=Filter]').click()
  cy.react('FiltersForm')
    .should('exist')
    .within(() => {
      // set `Toptal payments`
      cy.react('Radio', { props: { value: 'toptalPayments' } })
        .eq(0)
        .click()
      cy.url().should(
        'include',
        '/?preset=Toptal+payments&preferred_payment_methods%5B%5D=toptal_payments&page=1'
      )

      // set `Payoneer`
      cy.react('Radio', { props: { value: 'payoneer' } })
        .eq(0)
        .click()
      cy.tick(500)
      cy.url().should(
        'include',
        '/?page=1&preset=Payoneer&preferred_payment_methods%5B%5D=payoneer'
      )

      // set `Staff commissions`
      cy.react('Radio', { props: { value: 'staffCommissions' } })
        .eq(0)
        .click()
      cy.tick(500)
      cy.url().should(
        'include',
        '/?page=1&preset=Staff+commissions&statuses%5B%5D=due&statuses%5B%5D=overdue&payee_roles%5B%5D=staff'
      )

      // set `Not selected`
      cy.react('Radio', { props: { value: '__default' } })
        .eq(0)
        .click()
      cy.tick(500)
      cy.url().should(
        'include',
        '/?page=1&statuses%5B%5D=due&statuses%5B%5D=overdue&payee_roles%5B%5D=staff'
      )

      // set `Toptal payments` again
      cy.react('Radio', { props: { value: 'toptalPayments' } })
        .eq(0)
        .click()
      cy.tick(500)
      cy.url().should(
        'include',
        '/?page=1&preset=Toptal+payments&preferred_payment_methods%5B%5D=toptal_payments'
      )
    })
}

const restoreFunctionality = () => {
  cy.react('FiltersSelection')
    .should('have.length', 1)
    .within(() => {
      cy.react('Tag')
        .contains('Preset: Toptal Payments')
        .should('have.length', 1)
      cy.react('Tag')
        .contains('Primary Method: Toptal Payments')
        .should('have.length', 1)
    })
}

export { basicFunctionality, restoreFunctionality }
