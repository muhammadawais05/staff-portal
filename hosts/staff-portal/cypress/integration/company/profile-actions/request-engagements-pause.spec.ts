import { updateRequestEngagementsPauseStubs } from '~integration/mocks/schema-updates/companies'
import CompanyProfilePage from '~integration/modules/pages/companies'
import { FormModal } from '~integration/modules/modals'

describe('Company page -> Request Engagements Pause', () => {
  const page = new CompanyProfilePage()
  const formModal = new FormModal()

  beforeEach(() => {
    updateRequestEngagementsPauseStubs()

    page.basicInfoTab.visitTab()
  })

  describe('when the form information is correct', () => {
    it('submits the form and requests engagements pause', () => {
      page.primaryActions.requestEngagementsPauseButton.click()

      formModal.comment.type('C')
      formModal.submitButton.click()
    })
  })
})
