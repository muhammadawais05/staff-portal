import { FormModal } from '~integration/modules/modals'

const componentName = 'ChangeEngagementStartDateForm'

class ChangeStartDateModal extends FormModal {
  getTimeZoneField() {
    return cy.getByTestId(`${componentName}-time-zone`).find('input')
  }

  getStartDateField() {
    return cy.getByTestId(`${componentName}-start-date`).find('input')
  }

  getReasonField() {
    return cy.getByTestId(`${componentName}-reason`).find('textarea')
  }
}

export default ChangeStartDateModal
