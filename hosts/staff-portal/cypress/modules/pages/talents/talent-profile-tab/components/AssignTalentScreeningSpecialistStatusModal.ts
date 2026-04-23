import { BasicModal } from '~integration/modules/modals'

class AssignTalentScreeningSpecialistStatusModal extends BasicModal {
  get assignDrowpdownButton() {
    return cy.getByTestId('assign-dropdown-button')
  }
  get talentScreeningSpecialistList() {
    return cy.getByTestId('tss-list')
  }
}

export default AssignTalentScreeningSpecialistStatusModal
