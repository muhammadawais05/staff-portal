import { JobPage } from '~integration/modules/pages/jobs'
import { updateSendEngagementPaymentsAgreementMocks } from '~integration/mocks/schema-updates/job'
import { FormModal } from '~integration/modules/modals'

describe('Job page -> Hired Talent -> More -> Send Payments Agreement', () => {
  const page = new JobPage()
  const { hiredTalentSection } = page
  const sendEngagementPaymentsAgreementModal = new FormModal()

  // TODO: rewrite with stubs
  it.skip('opens `Send Payments Agreement` modal', () => {
    updateSendEngagementPaymentsAgreementMocks()

    page.visit()

    hiredTalentSection.getFirstHiredTalentMoreButton().click()
    page.moreDropdown.contains('Send Payments Agreement').click()

    sendEngagementPaymentsAgreementModal.submitButton.click()

    cy.getNotification().should(
      'have.text',
      'The Semi-Monthly Payments Agreement was successfully sent to the talent.'
    )
  })
})
