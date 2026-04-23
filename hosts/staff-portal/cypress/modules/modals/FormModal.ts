import { BasicModal } from '.'

class FormModal extends BasicModal {
  get submitButton() {
    return this.modal.find('button[type=submit]')
  }

  get comment() {
    return this.modal.find('#comment')
  }

  get tooltip() {
    return cy.get('div[role="tooltip"]')
  }

  submit() {
    this.modal.find('form').submit()
  }

  setTextArea(id: string, value: string) {
    cy.get(`#${id}`).type(value)
  }

  setDropdown(id: string, value: string) {
    cy.get(`input[id*=${id}]`).first().click()
    cy.get('li').contains(value).click()
  }

  toggleCheckbox(id: string) {
    return cy.get(`#${id}`).click()
  }

  getRadio(id: string, value: string) {
    return cy.get(`#${id}`).contains(value)
  }
}

export default FormModal
