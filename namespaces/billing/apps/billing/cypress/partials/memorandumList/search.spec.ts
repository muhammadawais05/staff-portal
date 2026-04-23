/// <reference types="cypress" />

const basicFunctionality = () => {
  cy.get('[aria-label=Filter]').click({ force: true })
  cy.react('FiltersForm')
    .should('exist')
    .within(() => {
      // change `Balance` filter
      cy.react('Radio', { props: { value: 'DEBIT' } })
        .eq(0)
        .click()
      cy.tick(500)
      cy.url().should(
        'include',
        '/?status=allocated&balance=debit&creation_date%5Bfrom%5D=2020-12-07&creation_date%5Btill%5D=2020-12-16&page=1'
      )

      cy.react('Radio', { props: { value: '' } })
        .eq(0)
        .click()
      cy.tick(500)
      cy.url().should(
        'include',
        '/?status=allocated&creation_date%5Bfrom%5D=2020-12-07&creation_date%5Btill%5D=2020-12-16&page=1'
      )

      // change `Status` filter
      cy.react('Radio', { props: { value: 'UNALLOCATED' } })
        .eq(0)
        .click()
      cy.tick(500)
      cy.url().should(
        'include',
        '/?status=unallocated&creation_date%5Bfrom%5D=2020-12-07&creation_date%5Btill%5D=2020-12-16&page=1'
      )
      cy.react('Radio', { props: { value: '' } })
        .eq(1)
        .click()
      cy.tick(500)
      cy.url().should(
        'include',
        '/?creation_date%5Bfrom%5D=2020-12-07&creation_date%5Btill%5D=2020-12-16&page=1'
      )

      // Reset `Creation date`
      cy.react('FiltersDateRange', { props: { name: 'creation_date' } }).within(
        () => {
          cy.get('input').eq(0).clear()
          cy.tick(500)
          cy.url().should(
            'include',
            '/?creation_date%5Btill%5D=2020-12-16&page=1'
          )
          cy.get('input').eq(1).clear()
          cy.tick(500)
          cy.url().should('include', '/?page=1')
        }
      )
    })
}

const restoreFunctionality = () => {
  cy.react('FiltersSelection')
    .should('have.length', 1)
    .within(() => {
      cy.react('Tag')
        .contains('Creation Date (From): 2020-12-07')
        .should('have.length', 1)
      cy.react('Tag')
        .contains('Creation Date (To): 2020-12-16')
        .should('have.length', 1)
      cy.react('Tag').contains('Balance: Credit').should('have.length', 1)
      cy.react('Tag').contains('Status: Allocated').should('have.length', 1)
    })
}

export { basicFunctionality, restoreFunctionality }
