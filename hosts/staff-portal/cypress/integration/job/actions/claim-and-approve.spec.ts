import { updateClaimAndApproveJobStubs } from '~integration/mocks/schema-updates/job'
import { jobListPageStubs } from '~integration/mocks/request-stubs'
import { JobListPage, JobPage } from '~integration/modules/pages/jobs'
import { ClaimAndApproveJobModal } from '~integration/modules/pages/jobs/components'
import { ENTER_KEY } from '~integration/utils'

describe('Job Page -> Claim and Approve Job', () => {
  const page = new JobPage()
  const modal = new ClaimAndApproveJobModal()

  describe('when the form information is correct', () => {
    it('submits the modal and displays the success notification message', () => {
      updateClaimAndApproveJobStubs()

      page.visit()

      page.actions.contains('Claim and Approve Job').click()

      modal.claimer
        .find('input:last')
        .click()
        .trigger('keydown', { keyCode: ENTER_KEY })

      modal.comment.type('c')
      modal.maxHourlyRate.type('1')

      modal.submitButton.contains('Next - Review Job Skills').click()

      modal.mainSkillSelect
        .find('input:last')
        .click()
        .trigger('keydown', { keyCode: ENTER_KEY })

      modal.firstSkillRequireButton.click()

      modal.submitButton.contains('Next - Review Job Description').click()

      modal.submitButton.contains('Approve Job').click()

      cy.getNotification().should(
        'have.text',
        'The Job was successfully approved.'
      )
    })
  })
})

describe('Job List Page -> Claim and Approve Job', () => {
  const page = new JobListPage()
  const modal = new ClaimAndApproveJobModal()

  describe('when the form information is correct', () => {
    it('submits the modal and displays the success notification message', () => {
      cy.stubGraphQLRequests(jobListPageStubs())
      updateClaimAndApproveJobStubs()

      page.visit()

      page.firstClaimAndApproveJobButton.click()

      modal.claimer
        .find('input:last')
        .click()
        .trigger('keydown', { keyCode: ENTER_KEY })

      modal.comment.type('c')
      modal.maxHourlyRate.type('1')

      modal.submitButton.contains('Next - Review Job Skills').click()

      modal.mainSkillSelect
        .find('input:last')
        .click()
        .trigger('keydown', { keyCode: ENTER_KEY })

      modal.firstSkillRequireButton.click()

      modal.submitButton.contains('Next - Review Job Description').click()

      modal.submitButton.contains('Approve Job').click()

      cy.getNotification().should(
        'have.text',
        'The Job was successfully approved.'
      )
    })
  })
})
