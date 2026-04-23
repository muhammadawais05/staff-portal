import { FormModal } from '~integration/modules/modals'

class ChangeOfacStatusModal extends FormModal {
  selectOfacStatus(text: string) {
    return cy.selectMenuOptionByText({
      field: 'ofac-status-select',
      text
    })
  }
}

export default ChangeOfacStatusModal
