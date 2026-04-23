import { FormModal } from '~integration/modules/modals'

export default class AddInfractionModal extends FormModal {
  get summary() {
    return cy.getByTestId('talent-infraction-form-fields-summary')
  }

  get selectReason() {
    return cy
      .getByTestId('talent-infraction-form-fields-reason')
      .find('input:last')
  }

  get whenOccured() {
    return cy.getByTestId('talent-infraction-form-fields-occurred-at')
  }

  get selectDate() {
    return cy.getByTestId('day-button-4')
  }

  get description() {
    return cy.getByTestId('talent-infraction-form-fields-details')
  }

  get assignee() {
    return cy.getByTestId('talent-infraction-form-fields-assignee')
  }

  get updateButton() {
    return cy.getByTestId('talent-infraction-edit-button')
  }
}
