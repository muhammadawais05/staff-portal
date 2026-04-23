import { FormModal } from '~integration/modules/modals'

class ClientPartnerUpdateDetailsModal extends FormModal {
  get successMessage() {
    return cy.getByTestId('update-client-partner-notification-modal-details')
  }
}

export default ClientPartnerUpdateDetailsModal
