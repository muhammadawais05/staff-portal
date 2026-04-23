import { FormModal } from '~integration/modules/modals'

const formComponentName = 'ReasonForm'

class CancelEngagementModal extends FormModal {
  getDetailsField() {
    return cy.getByTestId(`${formComponentName}-details`)
      .get('textarea')
  }

  getReasonField() {
    return cy.getByTestId(`${formComponentName}-reasonId`)
  }
}

export default CancelEngagementModal
