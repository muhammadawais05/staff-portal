import { FormModal } from '~integration/modules/modals'

export default class DeleteInfractionModal extends FormModal {
  get comment() {
    return cy.getByTestId('talent-infraction-remove-modal-comment')
  }

  get removeButton() {
    return cy.getByTestId('talent-infraction-remove-modal-remove-button')
  }
}
