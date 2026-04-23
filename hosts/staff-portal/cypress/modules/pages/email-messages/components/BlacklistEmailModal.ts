import { BasicModal } from '../../../modals'

export default class BlacklistEmailModal extends BasicModal {
  get submitButton() {
    return cy.getByTestId(`blacklist-submit-button`)
  }
}
