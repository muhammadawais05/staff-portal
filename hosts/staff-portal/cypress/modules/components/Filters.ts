/// <reference types="cypress" />

class Filters {
  get toggleButton() {
    return cy.getByTestId('toggle-filters-form')
  }

  getField(name: string) {
    return cy.getByTestId(`FiltersField:${name}`)
  }

  selectDropdownValue({ key, value }: { key: string; value: string }) {
    /**
     * Using the selectMenuOptionByValue will click on the column, not on the editable element.
     * In this solution, the first element, in this case, the editable element (select), will be clicked.
     */
    this.getField(key).find('*:first').click()

    cy.get('[role="listbox"]').within(() => {
      cy.get(`li[value="${value}"]`).click({ force: true })
    })
  }

  selectDateRageFrom({ key, value }: { key: string; value: string }) {
    this.getField(key).getByTestId('filters-date-from').type(value)
  }

  selectDateRageTill({ key, value }: { key: string; value: string }) {
    this.getField(key).getByTestId('filters-date-till').type(value)
  }

  selectFlagFilter({ flag }: { flag: string }) {
    this.getField('Flags')
      .find('input')
      .scrollIntoView()
      .click({ force: true })
      .getByTestId('type-select-category-option')
      .contains(flag)
      .click()
  }
}

export default Filters
