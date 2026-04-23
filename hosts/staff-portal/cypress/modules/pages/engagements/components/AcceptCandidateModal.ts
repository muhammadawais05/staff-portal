import { FormModal } from '~integration/modules/modals'
import { ENTER_KEY } from '~integration/utils'

class AcceptCandidateModal extends FormModal {
  fillStartDateWith(value: string) {
    cy.getByTestId('accept-candidate-form-start-date')
      .find('input')
      .type(value)
      .trigger('keydown', { keyCode: ENTER_KEY })
  }

  get timeZone() {
    return cy.getByTestId('accept-candidate-form-time-zone').find('input:last')
  }
}

export default AcceptCandidateModal
