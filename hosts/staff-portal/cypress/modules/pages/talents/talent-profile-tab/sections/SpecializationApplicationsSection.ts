import { FormModal } from '~integration/modules/modals'
import {
  AddTalentToRemoteConsultingModal,
  SendTalentToSpecializationModal,
  RejectSpecializationApplicationModal,
  ConvertSpecializationApplicationModal
} from '../components'

class SpecializationApplicationSection {
  sendTalentToSpecializationModal = new SendTalentToSpecializationModal()
  addTalentToRemoteConsultingModal = new AddTalentToRemoteConsultingModal()
  rejectSpecializationApplicationModal =
    new RejectSpecializationApplicationModal()
  convertSpecializationApplicationModal =
    new ConvertSpecializationApplicationModal()
  resumeTalentSpecializationApplicationModal = new FormModal()

  get section() {
    return cy.getByTestId('talent-specialization-applications-section')
  }

  get sendTalentToSpecializationButton() {
    return this.section.getByTestId('send-talent-to-specialization-button')
  }

  get addTalentToRemoteConsultingButton() {
    return this.section.getByTestId('add-talent-to-remote-consulting-button')
  }

  get specializationApplications() {
    return this.section.findByTestId('items-table').find('tbody > tr')
  }
}

export default SpecializationApplicationSection
