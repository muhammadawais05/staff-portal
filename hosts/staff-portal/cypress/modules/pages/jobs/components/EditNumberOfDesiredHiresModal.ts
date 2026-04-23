import { FormModal } from '~integration/modules/modals'

class EditNumberOfDesiredHiresModal extends FormModal {
  get numberOfDesiredHiresField() {
    return cy.getByTestId('NumberOfDesiredHiresModal-talentCount')
  }

  get increaseCount() {
    return this.numberOfDesiredHiresField.find('button').first()
  }
}

export default EditNumberOfDesiredHiresModal
