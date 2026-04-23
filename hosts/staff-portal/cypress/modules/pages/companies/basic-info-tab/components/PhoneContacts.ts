import { EditableField } from '~integration/modules/components'

class PhoneContacts {
  private editableField = new EditableField()

  get() {
    return this.editableField.get('phones')
  }

  startEdit() {
    this.editableField.toggleEditMode('phones')
  }

  getDeleteItemButton(index: number) {
    return cy.getByTestId(`RemoveButton-${index}`)
  }

  get addItemButton() {
    return cy.getByTestId('EditableFieldArray-add')
  }

  get saveButton() {
    return cy.getByTestId('EditableFieldArray-save')
  }

  get cancelButton() {
    return cy.getByTestId('EditableFieldArray-cancel')
  }

  getViewer(index: number) {
    return cy.getByTestId(`EditableFieldArrayView-item-${index}`)
  }

  get phoneInputs() {
    return cy.getByTestId('phone-contact-editor-item-phone')
  }

  get phoneCategories() {
    return cy.getByTestId('phone-contact-editor-item-category')
  }

  getMenuItem(text: string) {
    return cy.get('[role="listbox"]').contains('li', text)
  }

  getSetPhoneAsPrimaryButton(index: number) {
    return cy.getByTestId(`MarkAsPrimaryButton-${index}-button`)
  }
}

export default PhoneContacts
