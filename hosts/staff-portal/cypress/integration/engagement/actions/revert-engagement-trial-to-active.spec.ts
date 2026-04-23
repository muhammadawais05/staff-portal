import { Engagement } from '~integration/modules/pages/engagements'
import { updateRevertToTrialMocks } from '~integration/mocks/schema-updates/engagement'
import { FormModal } from '~integration/modules/modals'

describe('Engagement page -> More -> Revert To Trial', () => {
  const page = new Engagement()
  const confirmationModal = new FormModal()

  describe('when the form information is correct', () => {
    it('reverts the trial and updates the Status section', () => {
      updateRevertToTrialMocks()

      page.visit()

      page.moreButton().click()
      page.moreDropdown.contains('Revert to Trial').click()

      confirmationModal.comment.type('Some comment')
      confirmationModal.submitButton.click()

      cy.getNotification().should(
        'have.text',
        'You reverted an engagement to the trial period.'
      )
    })
  })
})
