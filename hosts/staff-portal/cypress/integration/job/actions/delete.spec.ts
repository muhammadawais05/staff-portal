import { deleteJobStubUpdates } from '~integration/mocks/schema-updates/job'
import { JobPage } from '~integration/modules/pages/jobs'
import { DeleteJobModal } from '~integration/modules/pages/jobs/components'

describe('Job Page -> Delete', () => {
  const page = new JobPage()
  const deleteJobModal = new DeleteJobModal()

  beforeEach(() => {
    deleteJobStubUpdates()
    page.visit()
  })

  it('Delete a job with no client hire', () => {
    page.actions.click()
    page.actions.contains('Delete').click()

    deleteJobModal.reasonField.click()
    deleteJobModal.tooltip.contains('Client budget is too small').click()

    deleteJobModal.comment.type('Some comment')
    deleteJobModal.clientHireField.click()

    deleteJobModal.tooltip.contains('No').click()
    deleteJobModal.submitButton.click()

    cy.getNotification().should(
      'have.text',
      'The Job was successfully removed.'
    )
  })

  it('Delete job with client hire', () => {
    page.actions.click()
    page.actions.contains('Delete').click()

    deleteJobModal.reasonField.click()
    deleteJobModal.tooltip.contains('Client budget is too small').click()

    deleteJobModal.comment.type('Some comment')
    deleteJobModal.clientHireField.click()

    deleteJobModal.tooltip.contains('Yes').click()

    deleteJobModal.hireTypeField.click()
    deleteJobModal.tooltip.contains('Internal').click()
    deleteJobModal.submitButton.click()

    cy.getNotification().should(
      'have.text',
      'The Job was successfully removed.'
    )
  })
})
