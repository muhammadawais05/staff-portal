import { FormModal } from '~integration/modules/modals'

const componentName = 'ChangeEngagementEndDateForm'

class ChangeEndDateModal extends FormModal {
  getEndDateField() {
    return cy.getByTestId(`${componentName}-datepicker`)
  }

  getReasonField() {
    return cy.getByTestId(`${componentName}-reason`)
      .find('textarea')
  }
}

export default ChangeEndDateModal
