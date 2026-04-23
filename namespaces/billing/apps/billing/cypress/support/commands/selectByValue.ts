/// <reference types="cypress" />

interface SelectByValue {
  field: string
  value: string | number
}

export default ({ field, value }: SelectByValue) => {
  cy.getByTestId(field).click()

  cy.get('[role="listbox"]').within(() => {
    cy.get(`li[value=${value}]`).click({ force: true })
  })
}
