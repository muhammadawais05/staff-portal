/// <reference types="cypress" />

export interface SelectByText {
  field: string
  text: string | number
}

export default ({ field, text }: SelectByText) => {
  cy.getByTestId(field).click()

  cy.get('[role="tooltip"]').within(() => {
    cy.get('span')
      .contains(text)
      .click({ force: true })
  })
}
