import { FormModal } from '~integration/modules/modals'

const componentFormName = 'ReasonForm'

class ReasonModal extends FormModal {
  getDescriptionField() {
    return cy.getByTestId(`${componentFormName}-description`)
  }

  getReasonField() {
    //TODO: Get a better locator for ReasonField
    return cy.get('input:last')
  }

  getDetailsField() {
    return cy.getByTestId(`${componentFormName}-details`)
  }
}

export default ReasonModal
