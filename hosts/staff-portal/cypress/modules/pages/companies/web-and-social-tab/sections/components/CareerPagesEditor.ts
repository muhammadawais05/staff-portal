/* global cy */

import { EditableField } from '~integration/modules/components'

class CareerPagesEditor {
  editableField = new EditableField()

  edit() {
    this.editableField.toggleEditMode('careerPages')
  }

  removeAllItems(count: number) {
    ;[...Array(count).keys()].forEach(value => this.removeItem(value))
  }

  removeItem(index: number) {
    return cy.getByTestId(`RemoveButton-${index}`).click()
  }

  addItem() {
    return this.clickButton('add')
  }

  submit() {
    return this.clickButton('save')
  }

  cancelEditing() {
    return this.clickButton('cancel')
  }

  clickButton(key: string) {
    return cy.getByTestId(`EditableFieldArray-${key}`).click()
  }

  setCareerPageUrl({ value, index }: { value: string; index: number }) {
    return cy.getByTestId(`CareerPagesEditorItem-${index}-url`).type(value)
  }

  getCareerPageUrlInputError(index: number) {
    return cy.getFieldError(`CareerPagesEditorItem-${index}-url`)
  }

  getCareerPageUrlLabel(index: number) {
    return cy.getByTestId(`EditableFieldArrayView-item-${index}`)
  }

  getPrimaryLabel(index: number) {
    return cy.getByTestId(`EditableFieldArrayView-primary-label-${index}`)
  }

  setCareerPageAsPrimary(index: number) {
    return cy.getByTestId(`MarkAsPrimaryButton-${index}-button`).click()
  }

  getErrorMessage() {
    return cy.getByTestId('FormBaseErrorContainer-error')
  }
}

export default CareerPagesEditor
