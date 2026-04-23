import { FormModal } from '~integration/modules/modals'

class ImportTalentContractModal extends FormModal {
  get contractKind() {
    return cy.getByTestId('talent-contract-kind').find('input:last')
  }

  get guidField() {
    return cy.getByTestId('talent-contract-guid').find('input:last')
  }
}

export default ImportTalentContractModal
