import { FormModal } from '../../../modals'

class AddJobModal extends FormModal {
  get clientField() {
    // data-testid gets stripped from Company Autocomplete component
    // this selects the autocomplete input next to the hidden input
    return cy.get('input[name="clientId"]+div>input')
  }
}

export default AddJobModal
