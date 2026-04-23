import { FormModal } from '../../../modals'

export default class BecomeMeetingOrganizerModal extends FormModal {
  get confirmButton() {
    return cy.getByTestId(`become-meeting-organizer-submit-button`)
  }

  get pickAnotherOrganizerButton() {
    return cy.getByTestId(`pick-another-organizer-button`)
  }
}
