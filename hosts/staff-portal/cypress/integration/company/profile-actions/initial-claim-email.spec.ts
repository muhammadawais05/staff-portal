import { updateInitialClaimEmailStubs } from '~integration/mocks/schema-updates/companies'
import CompanyProfilePage from '~integration/modules/pages/companies/CompanyProfilePage'
import SendEmailModal from '~integration/modules/modals/SendEmailModal'

describe('Initial Claim Email', () => {
  const sendEmailModal = new SendEmailModal()
  const page = new CompanyProfilePage()

  beforeEach(() => {
    updateInitialClaimEmailStubs()
  })

  it('opens and submits Initial Claim Email modal', () => {
    page.basicInfoTab.visitTab()

    page.primaryActions.initialClaimEmailButton.click()

    sendEmailModal.subjectField.type('S')
    sendEmailModal.submitButton.click()
  })
})
