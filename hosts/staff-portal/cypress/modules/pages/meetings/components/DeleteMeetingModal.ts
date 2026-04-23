import { FormModal } from '../../../modals'

export default class DeleteMeetingModal extends FormModal {
  get submitButton() {
    return cy.getByTestId('CustomPromptButton-submit-button')
  }
}
