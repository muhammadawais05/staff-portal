import {
  ArchiveTalentScreeningSpecialistStatusModal,
  AssignTalentScreeningSpecialistStatusModal
} from '../components'

class TalentScreeningSpecialistStatusSection {
  assignTalentScreeningSpecialistStatusModal =
    new AssignTalentScreeningSpecialistStatusModal()
  archiveTalentScreeningSpecialistStatusModal =
    new ArchiveTalentScreeningSpecialistStatusModal()

  get section() {
    return cy.getByTestId('talent-screening-specialist-status-section')
  }

  get emptySpecialistAssignmentTable() {
    return this.section.findByTestId('empty-specialist-assignment-table')
  }

  get specialistAssignmentTable() {
    return this.section.findByTestId('specialist-assignment-table')
  }
}

export default TalentScreeningSpecialistStatusSection
