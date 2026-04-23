import { ENTER_KEY } from '~integration/utils'

class Autocomplete {
  selectAutocompleteValue({
    inputTestId,
    menuItemTestId,
    value
  }: {
    inputTestId: string
    menuItemTestId: string
    value: string
  }) {
    cy.clock()

    cy.getByTestId(inputTestId)
      .click()
      .type('t')
      .trigger('keydown', { keyCode: ENTER_KEY })
      .tick(500)

    cy.getByTestId(inputTestId).click()

    cy.get(`[data-test-id^='${menuItemTestId}-']`).contains(value).click()
  }
}

export default Autocomplete
