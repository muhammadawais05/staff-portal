import { FormModal } from '~integration/modules/modals'

class SetHealthStatusModal extends FormModal {
  get healthStatusField() {
    return cy.getByTestId('set-health-status-modal-select')
  }

  selectHealthStatus() {
    return cy.get('[role="listbox"]').find('li').contains('None').click()
  }
}

export default SetHealthStatusModal
