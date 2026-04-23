import { FormModal } from '~integration/modules/modals'

const formComponentName = 'create-feedback-answers-form'

class MatcherFeedback extends FormModal {
  getCreateFeedbackButton() {
    return cy.getByTestId('CreateFeedbackMatcherAnswersButton')
  }

  getQuestionCheckbox(index: number) {
    return cy.getByTestId(`${formComponentName}-option-${index}`).find('input')
  }
}

export default MatcherFeedback
