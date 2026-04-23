import { JobPage } from '~integration/modules/pages/jobs'
import { updateSalesOwnerMock } from '~integration/mocks/schema-updates/job'
import { FormModal } from '~integration/modules/modals'
import { CompanyInformation } from '~integration/modules/pages/jobs/components'

describe('Company Information', () => {
  const page = new JobPage()
  const companyInformation = new CompanyInformation()
  const reassignSalesOwnerModal = new FormModal()

  describe('when user chooses to change Sales Owner', () => {
    it('Reassign Sales Owner modal is opened', () => {
      updateSalesOwnerMock()

      page.visit()

      companyInformation.salesOwnerEditButton.click()
      reassignSalesOwnerModal.setDropdown('relationship', 'Account')
      reassignSalesOwnerModal.setDropdown('salesOwnerId', 'Robert')
      reassignSalesOwnerModal.setTextArea('comment', 'test')
      reassignSalesOwnerModal.submit()

      page
        .getNotification('The Sales Owner was successfully updated')
        .should('be.visible')
    })
  })
})
