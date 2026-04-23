import {
  updateCreateSoftSkillRatingStubs,
  updateRemoveSoftSkillRatingStubs
} from '~integration/mocks/schema-updates/talents/talent-list'
import { TalentListPage } from '~integration/modules/pages'
import { TalentListItem } from '~integration/modules/pages/talents/talent-list'

describe('Talent List Item > Soft Skills Section', () => {
  const page = new TalentListPage()
  const talentListItem = new TalentListItem()
  const section = talentListItem.softSkillsSection
  const createRatingModal = section.createRatingModal
  const removeRatingModal = section.removeRatingModal

  it('adds soft skill rating', () => {
    updateCreateSoftSkillRatingStubs()
    page.visit()
    talentListItem.qualityRatingsTab.click()
    talentListItem.qualityRatingsSection.should('be.visible')

    section.addRatingButton.click()
    createRatingModal.ratingStar.click()
    createRatingModal.comment.type('a')
    createRatingModal.submit()

    cy.getNotification().should('contain', 'Talent has been rated.')
  })

  it('removes soft skill rating', () => {
    updateRemoveSoftSkillRatingStubs()
    page.visit()
    talentListItem.qualityRatingsTab.click()
    talentListItem.qualityRatingsSection.should('be.visible')

    section.expandableButton.click()
    section.removeRatingButton.click()

    removeRatingModal.submit()
    cy.getNotification().should('contain', 'Rating has been deleted.')
  })
})
