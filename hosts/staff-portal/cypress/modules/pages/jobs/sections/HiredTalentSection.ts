import { TrialLengthEdit } from '~integration/modules/components'

class HiredTalentSection {
  trialLengthEdit = new TrialLengthEdit()

  getSection() {
    return cy.getByTestId('HiredTalentSection')
  }

  getHiredTalentItems() {
    return this.getSection().findByTestId('HiredTalentRow')
  }

  getTrialLengthEditButton() {
    return this.getSection().findByTestId('TrialLengthEdit-button')
  }

  getFirstHiredTalentItem() {
    return this.getHiredTalentItems().first()
  }

  getFirstHiredTalentMoreButton() {
    return this.getFirstHiredTalentItem().findByTestId(
      'HiredTalentMoreDropdown-more-button'
    )
  }
}

export default HiredTalentSection
