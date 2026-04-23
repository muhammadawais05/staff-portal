import { updateIssueAnInvoiceStubs } from '~integration/mocks/schema-updates/companies'
import CompanyProfilePage from '~integration/modules/pages/companies/CompanyProfilePage'
import { IssueAnInvoiceModal } from '~integration/modules/pages/companies/components'

describe('Issue an invoice', () => {
  const issueAnInvoiceModal = new IssueAnInvoiceModal()
  const page = new CompanyProfilePage()

  beforeEach(() => {
    updateIssueAnInvoiceStubs()
  })

  it('opens Issue an Invoice modal', () => {
    page.basicInfoTab.visitTab()

    page.moreDropdown.click()

    page.moreDropdown.contains('Issue a Deposit Invoice').click()

    issueAnInvoiceModal.amount.type('1')
    issueAnInvoiceModal.setDropdown('duePeriod', 'Net 10')
    issueAnInvoiceModal.comment.type('c')
    issueAnInvoiceModal.sendNotificationsCheckbox.check()
    issueAnInvoiceModal.submit()

    page
      .getNotification('The Deposit Invoice was successfully created.')
      .should('be.visible')
  })
})
