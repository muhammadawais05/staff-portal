import {
  AddInfractionModal,
  DeleteInfractionModal
} from '~integration/modules/pages/talents/talent-performance-tab/components'

export default class TalentInfractionsSection {
  addInfractionModal = new AddInfractionModal()
  deleteInfractionModal = new DeleteInfractionModal()

  get infractionSection() {
    return cy.getByTestId('infractions-section')
  }

  get addInfractionButton() {
    return cy.getByTestId('talent-add-infraction-button')
  }

  get infractionEditButton() {
    return cy.getByTestId('edit-infraction')
  }

  get infractionDeleteButton() {
    return cy.getByTestId('delete-infraction')
  }

  get itemFieldReason() {
    return cy.getByTestId('item-field: Reason')
  }

  get itemFieldDeatils() {
    return cy.getByTestId('item-field: Details')
  }

  get infractionItems() {
    return cy.getByTestId('talent-infractions-items')
  }
}
