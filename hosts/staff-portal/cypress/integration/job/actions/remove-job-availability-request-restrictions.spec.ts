import removeRestrictionsForAvailabilityRequestsStubs from '~integration/mocks/schema-updates/job/remove-restrictions-availability-requests-stub-updates'
import { JobPage } from '~integration/modules/pages/jobs'
import RemoveJobAvailabilityRequestsRestrictionModal from '~integration/modules/pages/jobs/components/RemoveJobAvailabilityRequestsRestrictionModal'

describe('Job Page -> Remove Restrictions for Availability Requests', () => {
  const page = new JobPage()
  const modal = new RemoveJobAvailabilityRequestsRestrictionModal()

  it('Remove Restrictions for Availability Requests', () => {
    removeRestrictionsForAvailabilityRequestsStubs()

    page.visit()
    page.actions.click()
    page.actions
      .contains('Remove Restrictions for Availability Requests')
      .click()

    modal.comment.type('Somme comment')
    modal.submitButton.click()

    cy.getNotification().should(
      'have.text',
      'The restrictions for the job was lifted successfully.'
    )
  })
})
