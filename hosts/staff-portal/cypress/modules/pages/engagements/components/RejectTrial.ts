import { FormModal } from '~integration/modules/modals'

const componentName = 'ReasonForm'

class RejectTrial extends FormModal {
  getReasonField() {
    return cy.getByTestId(`${componentName}-reasonId`).find('input:last')
  }

  getDetailsField() {
    return cy.getByTestId(`${componentName}-details`).find('textarea')
  }
}

export default RejectTrial
