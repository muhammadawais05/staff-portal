import { FormModal } from '~integration/modules/modals'

const modalComponentName = 'EditableStaffTransferModal'

class StaffRequestTransferModal extends FormModal {
  getTransferButton() {
    return cy.getByTestId('EditableStaffTransferButton-transfer-button')
  }

  selectStaff(text: string) {
    return cy.selectMenuOptionByText({
      field: `${modalComponentName}-select`,
      text
    })
  }
}

export default StaffRequestTransferModal
