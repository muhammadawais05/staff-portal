import TalentCommunityLeaderTab from '~integration/modules/pages/talents/community-leader-tab'
import {
  updateMakeCommunityLeaderRequestsStub,
  updateRestoreCommunityLeaderRequestsStub,
  updateRejectCommunityLeaderRequestsStub,
  updateRemoveCommunityLeaderRequestsStub,
  updateFeatureCommunityLeaderRequestsStub,
  updateRemoveFeatureCommunityLeaderRequestsStub,
  updateAppliedCommunityLeaderRequestsStub
} from '~integration/mocks/schema-updates/community-leaders'

describe('Community Leader tab', () => {
  const page = new TalentCommunityLeaderTab()
  const { communityLeaderSection } = page

  it('makes community leader when status is not applied', () => {
    updateMakeCommunityLeaderRequestsStub({ useSharedStub: true })

    page.visit()

    communityLeaderSection.makeCommunityLeader.click()
    page.modal.self.contains('Online Community Leader').click()
    page.modal.self.contains('Assign Euna Conroy as a Community Leader')
    page.modal.clickButton('Confirm')

    cy.getNotification().should(
      'have.text',
      'Community Leader Euna Conroy was created successfully'
    )
  })

  it('removes when Community Leader is approved', () => {
    updateRemoveCommunityLeaderRequestsStub({ useSharedStub: true })

    page.visit()

    communityLeaderSection.removeCommunityLeader.click()

    cy.getNotification().should(
      'have.text',
      'Community Leader Euna Conroy was removed successfully'
    )
  })

  // TODO: Enable back when we only have 1 mutation to restore a community leader
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('restores when Community Leader is deleted', () => {
    updateRestoreCommunityLeaderRequestsStub({ useSharedStub: true })

    page.visit()

    communityLeaderSection.restoreCommunityLeader.click()
    page.modal.clickButton('Confirm')

    cy.getNotification().should(
      'have.text',
      'Community Leader Euna Conroy was restored successfully'
    )
  })

  it('makes Community Leader when application is rejected', () => {
    updateRejectCommunityLeaderRequestsStub()

    page.visit()

    communityLeaderSection.makeCommunityLeader.click()
    page.modal.self.contains('Online Community Leader').click()
    page.modal.self.contains('Assign Euna Conroy as a Community Leader')
    page.modal.clickButton('Confirm')

    cy.getNotification().should(
      'have.text',
      'Community Leader Euna Conroy was created successfully'
    )
  })

  it('makes featured community leader', () => {
    updateFeatureCommunityLeaderRequestsStub({ useSharedStub: true })

    page.visit()

    communityLeaderSection.featureCommunityLeader.click()

    cy.getNotification().should(
      'have.text',
      'Community Leader Euna Conroy is now featured'
    )
  })

  it('removes featured community leader', () => {
    updateRemoveFeatureCommunityLeaderRequestsStub({ useSharedStub: true })

    page.visit()

    communityLeaderSection.removeFeaturedCommunityLeader.click()

    cy.getNotification().should(
      'have.text',
      'Community Leader Euna Conroy is no longer featured'
    )
  })

  it('approves Community Leader when application has been sent', () => {
    updateAppliedCommunityLeaderRequestsStub()

    page.visit()

    communityLeaderSection.approveCommunityLeaderApplication.click()

    page.modal.self.contains(
      "Approve Euna Conroy's Community Leader Application"
    )
    page.modal.clickButton('Approve')

    cy.getNotification().should(
      'have.text',
      "Euna Conroy's application was successfully approved."
    )
  })

  it('rejects Community Leader when application has been sent', () => {
    updateAppliedCommunityLeaderRequestsStub()

    page.visit()

    communityLeaderSection.rejectCommunityLeaderApplication.click()

    page.modal.self.contains(
      "Reject Euna Conroy's Community Leader Application"
    )

    page.modal.self
      .findByTestId('modal-input')
      .click()
      .type('Talent is not matched with requirements')

    page.modal.clickButton('Reject')

    cy.getNotification().should(
      'have.text',
      'Euna Conroy application was successfully rejected.'
    )
  })
})
