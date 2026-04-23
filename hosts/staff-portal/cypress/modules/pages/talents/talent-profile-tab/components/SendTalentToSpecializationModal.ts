import { FormModal } from '~integration/modules/modals'

class SendTalentToSpecializationModal extends FormModal {
  get specialization() {
    return this.modal
      .getByTestId('send-talent-to-specialization-modal-specialization')
      .find('input:last')
  }

  selectSpecialization(text: string) {
    return cy.selectMenuOptionByText({
      field: 'send-talent-to-specialization-modal-specialization',
      text
    })
  }
}

export default SendTalentToSpecializationModal
