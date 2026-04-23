import { FormModal } from '~integration/modules/modals'

class ApplyToDifferentVerticalModal extends FormModal {
  get newVerticalSelect() {
    return cy.getByTestId('new-vertical-id-selector').find('input:last')
  }

  get skillsAutocomplete() {
    return cy.getByTestId('talent-applicant-skills-selector-input')
  }
}

export default ApplyToDifferentVerticalModal
