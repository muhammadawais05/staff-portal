import { BasicModal } from '~integration/modules/modals'
import TaskCard from './TaskCard'

class CompanyTaskCard extends TaskCard {
  basicModal = new BasicModal()

  get timelineButton() {
    return this.get().findByTestId('timeline-button')
  }

  get addActivityButton() {
    return this.get().findByTestId('add-activity-button')
  }

  get sendEmailButton() {
    return this.get().findByTestId('send-email-action-item')
  }

  get contactButton() {
    return this.get().findByTestId('contact-client-button')
  }

  get phoneButton() {
    return this.get().findByTestId('PhoneLink')
  }

  get phoneModalCloseButton() {
    return this.basicModal.self.findByTestId('CustomPromptButton-cancel-button')
  }

  get skypeButton() {
    return this.get().findByTestId('skype-id')
  }

  get skypeModalCloseButton() {
    return this.basicModal.self.findByTestId('SkypeContact-close-modal-button')
  }

  get applicationInfoLink() {
    return this.get().findByTestId('application-info-field-link')
  }
}

export default CompanyTaskCard
