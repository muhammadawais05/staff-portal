import { FormModal } from '~integration/modules/modals'

const componentName = 'TerminateEngagementModal'

class TerminateEngagement extends FormModal {
  getReasonField() {
    return cy.getByTestId(`${componentName}-reasonId`).find('input:last')
  }

  getSubReasonField() {
    return cy
      .getByTestId('FormReasonSelectWithSubReason-subReasonId')
      .find('input:last')
  }

  getDetailsField() {
    return cy.getByTestId(`${componentName}-details`).find('textarea')
  }

  getTalentSwapField() {
    return cy.getByTestId('EngagementTalentSwap-radio-group').contains('Yes')
  }
}

export default TerminateEngagement
