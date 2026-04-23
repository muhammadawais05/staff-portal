import { FormModal } from '~integration/modules/modals'

class ContactsAndAgreementsSection {
  deleteContractModal = new FormModal()

  get section() {
    return cy.getByTestId('talent-contracts-and-agreements-section')
  }
  get talentAgreementItems() {
    return this.section.findByTestId('talent-agreement-item')
  }

  get talentContractItems() {
    return this.section.findByTestId('talent-contract-item')
  }
}

export default ContactsAndAgreementsSection
