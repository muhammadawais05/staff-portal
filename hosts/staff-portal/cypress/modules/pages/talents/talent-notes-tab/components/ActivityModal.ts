import { BasicModal } from '~integration/modules/modals'

class ActivityModal extends BasicModal {
  get subtypeSelect() {
    return cy.getByTestId('FormActivitySubtypeSelect').find('input:last')
  }

  get durationField() {
    return cy.getByTestId('ActivityForm-duration-field').find('input:last')
  }

  get outcomeSelect() {
    return cy.getByTestId('FormActivityOutcomeSelect').find('input:last')
  }
}

export default ActivityModal
