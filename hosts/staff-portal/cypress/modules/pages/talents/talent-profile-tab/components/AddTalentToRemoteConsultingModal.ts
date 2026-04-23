import { FormModal } from '~integration/modules/modals'

class AddTalentToRemoteConsultingModal extends FormModal {
  get specialization() {
    return this.modal
      .getByTestId('add-talent-to-remote-consulting-modal-specialization')
      .find('input:last')
  }

  selectSpecialization(text: string) {
    return cy.selectMenuOptionByText({
      field: 'add-talent-to-remote-consulting-modal-specialization',
      text
    })
  }
}

export default AddTalentToRemoteConsultingModal
