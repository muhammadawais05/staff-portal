/// <reference types="cypress" />

class EditableTextArea {
  get(key: string) {
    return cy.getByTestId(`EditableField-${key}`)
  }

  getTextArea(key: string) {
    return cy
      .getByTestId(`EditableField-${key}-editor`)
      .find('textarea')
      .first()
  }

  getTextAreaSubmit(key: string) {
    return cy.getByTestId(`EditableField-${key}-editor-submit`)
  }

  updateTextArea({ key, value }: { key: string; value: string }) {
    const input = this.getTextArea(key)

    input.type(value)

    return {
      save: () => this.getTextAreaSubmit(key).click()
    }
  }

  toggleEditMode(key: string) {
    return cy.getByTestId(`EditableField-toggle-button-${key}`).click()
  }
}

export default EditableTextArea
