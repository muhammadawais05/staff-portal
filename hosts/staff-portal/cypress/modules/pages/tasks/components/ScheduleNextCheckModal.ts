import { FormModal } from '~integration/modules/modals'

class ScheduleNextCheckModal extends FormModal {
  get actionDate() {
    return cy.getByTestId('schedule-next-check-modal-action-date')
  }
}

export default ScheduleNextCheckModal
