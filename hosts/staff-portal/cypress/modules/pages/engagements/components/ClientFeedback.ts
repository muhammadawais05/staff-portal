import { FormModal } from '~integration/modules/modals'

const modalComponentName = 'create-feedback-client-answers-modal'
const formComponentName = 'create-feedback-answers-form'

class ClientFeedback extends FormModal {
  getCreateFeedbackButton() {
    return cy.getByTestId('CreateFeedbackClientAnswersButton')
  }

  getCopyLinkButton() {
    return cy.getByTestId(`${modalComponentName}-copy-link-button`)
  }

  getQuestionCheckbox(index: number) {
    return cy.getByTestId(`${formComponentName}-option-${index}`).find('input')
  }
}

export default ClientFeedback
