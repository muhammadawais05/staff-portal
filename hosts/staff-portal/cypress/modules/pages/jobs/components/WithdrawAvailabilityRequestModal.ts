import { FormModal } from '~integration/modules/modals'

class WithdrawAvailabilityRequestModal extends FormModal {
  selectReasonFieldMenuOption(text: string | number) {
    cy.selectMenuOptionByText({ field: 'reason-field', text })
  }
}

export default WithdrawAvailabilityRequestModal
