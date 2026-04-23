import { FormModal } from '../../../modals'

export default class AssociateUserModal extends FormModal {
  get selectButton() {
    return cy.getByTestId(`select-button`)
  }

  get userAutocompleteField() {
    return cy.getByTestId('user-autocomplete')
  }
}
