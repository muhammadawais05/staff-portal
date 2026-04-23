import { FormModal } from '../../../modals'

export default class TransferMeetingModal extends FormModal {
  get confirmButton() {
    return cy.getByTestId('change-meeting-organizer-submit-button')
  }

  get organizerSchedulerField() {
    return cy.getByTestId('scheduler-select')
  }

  get organizerSchedulerFieldLastOption() {
    return this.organizerSchedulerField.find('input:last')
  }

  get pickAnotherOrganizerButton() {
    return cy.getByTestId('pick-another-organizer-button')
  }
}
