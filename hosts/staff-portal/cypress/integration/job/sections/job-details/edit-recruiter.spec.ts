import { JobPage } from '~integration/modules/pages/jobs'
import { updateRecruiterMock } from '~integration/mocks/schema-updates/job'
import { FormModal } from '~integration/modules/modals'
import { CompanyInformation } from '~integration/modules/pages/jobs/components'

describe('Company Information', () => {
  const page = new JobPage()
  const companyInformation = new CompanyInformation()
  const reassignRecruiterModal = new FormModal()

  describe('when user chooses to change Recruiter', () => {
    it('Reassign Recruiter modal is opened', () => {
      updateRecruiterMock()

      page.visit()

      companyInformation.recruiterEditButton.click()
      reassignRecruiterModal.setDropdown('claimerId', 'Alessa')
      reassignRecruiterModal.setTextArea('comment', 'test')
      reassignRecruiterModal.submit()

      page
        .getNotification('The Job Recruiter was successfully changed')
        .should('be.visible')
    })
  })
})
