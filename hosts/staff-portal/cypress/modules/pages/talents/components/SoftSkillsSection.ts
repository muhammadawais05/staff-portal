import CreateSoftSkillRatingModal from './CreateSoftSkillRatingModal'
import RemoveSoftSkillRatingModal from './RemoveSoftSkillRatingModal'

export default class SoftSkillsSection {
  createRatingModal = new CreateSoftSkillRatingModal()
  removeRatingModal = new RemoveSoftSkillRatingModal()

  get expandableButton() {
    return cy.getByTestId('expand-soft-skill-button')
  }

  get addRatingButton() {
    return cy.getByTestId('create-soft-skill-rating-button')
  }

  get removeRatingButton() {
    return cy.getByTestId('remove-soft-skill-rating-button')
  }
}
