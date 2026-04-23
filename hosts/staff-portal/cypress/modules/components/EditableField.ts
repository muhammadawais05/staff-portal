/// <reference types="cypress" />

class EditableField {
  get(key: string) {
    return cy.getByTestId(`EditableField-${key}`)
  }

  getInput(key: string) {
    return cy.getByTestId(`EditableField-${key}-editor`).find('input')
  }

  updateInput({ key, value }: { key: string; value: string }) {
    const input = this.getInput(key)

    input.type(value)

    return {
      save: () => input.type('{enter}')
    }
  }

  toggleEditMode(key: string) {
    return cy.getByTestId(`EditableField-toggle-button-${key}`).click()
  }

  selectDropdownValue({ key, value }: { key: string; value: string }) {
    /**
     * Using the selectMenuOptionByValue will click on the column, not on the editable element.
     * In this solution, the first element, in this case, the editable element (select), will be clicked.
     */
    cy.getByTestId(`EditableField-${key}-editor`).find('*:first').click()

    cy.get('[role="listbox"]').within(() => {
      cy.get(`li[value="${value}"]`).click({ force: true })
    })
  }
}

export default EditableField
