import TalentProfilePage from '~integration/modules/pages/talents/talent-profile-tab'
import {
  updateTalentProfileSoftSkillCreateRatingStubs,
  updateTalentProfileSoftSkillRemoveRatingStubs
} from '~integration/mocks/schema-updates/talents'

describe('Talent Profile > Soft Skills Section', () => {
  const page = new TalentProfilePage()
  const { softSkillsSection: section } = page
  const createRatingModal = section.createRatingModal
  const removeRatingModal = section.removeRatingModal

  it('adds soft skill rating', () => {
    updateTalentProfileSoftSkillCreateRatingStubs()
    page.visit()

    section.addRatingButton.click()
    createRatingModal.ratingStar.click()
    createRatingModal.comment.type('a')
    createRatingModal.submit()

    cy.getNotification().should('contain', 'Talent has been rated.')
  })

  it('removes soft skill rating', () => {
    updateTalentProfileSoftSkillRemoveRatingStubs()
    page.visit()

    section.expandableButton.click()
    section.removeRatingButton.click()

    removeRatingModal.submit()
    cy.getNotification().should('contain', 'Rating has been deleted.')
  })
})
