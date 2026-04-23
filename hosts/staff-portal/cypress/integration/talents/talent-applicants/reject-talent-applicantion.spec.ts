import { TalentApplicantsPage } from '~integration/modules/pages'
import { updateRejectTalentApplicationStubsForTalentApplicantsPage } from '~integration/mocks/schema-updates/talents'
import { FormModal } from '~integration/modules/modals'

describe('Talent Applicants > Reject Application', () => {
  const page = new TalentApplicantsPage()

  const modal = new FormModal()

  it('opens the modal from the header button', () => {
    updateRejectTalentApplicationStubsForTalentApplicantsPage()

    page.visit()

    page.headerActions.rejectApplication.click()

    page.rejectSpecializationModal.selectRejectionReason('Other')
    modal.comment.type('a')

    updateRejectTalentApplicationStubsForTalentApplicantsPage()

    modal.submit()

    cy.getNotification().should(
      'have.text',
      'The Applicant was successfully rejected.'
    )
  })
})
