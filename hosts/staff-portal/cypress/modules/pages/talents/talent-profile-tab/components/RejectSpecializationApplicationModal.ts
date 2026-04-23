import { FormModal } from '~integration/modules/modals'

class RejectSpecializationApplicationModal extends FormModal {
  get rejectionReason() {
    return cy.getByTestId('rejection-reason-field')
  }

  selectRejectionReason(text: string) {
    return cy.selectMenuOptionByText({
      field: 'rejection-reason-field',
      text
    })
  }
}

export default RejectSpecializationApplicationModal
