import { FormModal } from '~integration/modules/modals'

class ConvertSpecializationApplicationModal extends FormModal {
  selectSpecialization(text: string) {
    return cy.selectMenuOptionByText({
      field: 'convert-specialization-application-modal-specialization',
      text
    })
  }
}

export default ConvertSpecializationApplicationModal
