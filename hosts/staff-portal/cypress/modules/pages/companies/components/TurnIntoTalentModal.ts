import { FormModal } from '~integration/modules/modals'

class TurnIntoTalentModal extends FormModal {
  get fullName() {
    return cy.getByTestId('TurnIntoTalent-fullName').find('input')
  }
}

export default TurnIntoTalentModal
