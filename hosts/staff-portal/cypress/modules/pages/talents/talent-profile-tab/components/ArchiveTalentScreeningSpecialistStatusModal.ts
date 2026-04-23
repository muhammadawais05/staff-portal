import { FormModal } from '~integration/modules/modals'

class ArchiveTalentScreeningSpecialistStatusModal extends FormModal {
  selectArchiveReason(text: string) {
    return cy.selectMenuOptionByText({
      field: 'select-archive-reason',
      text
    })
  }
}

export default ArchiveTalentScreeningSpecialistStatusModal
