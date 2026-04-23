import { FormModal } from '~integration/modules/modals'
import { ENTER_KEY } from '~integration/utils'

class ScheduleBreakModal extends FormModal {
  get messageToClientTextField() {
    return this.modal
      .findByTestId('FormContent-message-to-client')
      .find('textarea')
  }

  getSingleDayTab() {
    return cy.getByTestId('DynamicForm-single-day-tab')
  }

  getMultipleDaysTab() {
    return cy.getByTestId('DynamicForm-multi-day-tab')
  }

  getStartDateField() {
    return cy.getByTestId('FormContent-start-date')
  }

  getEndDateField() {
    return cy.getByTestId('FormContent-end-date')
  }

  getReasonField() {
    return cy.getByTestId('FormContent-reason-id').find('input:last')
  }

  fillStartDateWith(value: string) {
    return this.getStartDateField().within(() => {
      cy.get('input')
        .clear()
        .type(value)
        .trigger('keydown', { keyCode: ENTER_KEY })
    })
  }

  fillEndDateWith(value: string) {
    return this.getEndDateField().within(() => {
      cy.get('input')
        .clear()
        .type(value)
        .trigger('keydown', { keyCode: ENTER_KEY })
    })
  }
}

export default ScheduleBreakModal
