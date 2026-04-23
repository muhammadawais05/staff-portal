import { FormModal } from '../../../modals'

export default class MarkMeetingAsNotCompletedModal extends FormModal {
  get commentField() {
    return cy.getByTestId('comment')
  }

  get outcomeField() {
    return cy.getByTestId('outcome')
  }
}
