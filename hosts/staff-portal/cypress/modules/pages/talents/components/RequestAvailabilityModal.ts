import { FormModal } from '../../../modals'

export default class RequestAvailabilityModal extends FormModal {
  get clientAutocompleteField() {
    return cy.getByTestId('company-autocomplete')
  }

  get selectJobField() {
    return cy.getByTestId('form-job-select-job-field')
  }
}
