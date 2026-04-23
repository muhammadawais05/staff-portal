import CompanyProfilePage from '~integration/modules/pages/companies'
import { updateJobsTabMocks } from '~integration/modules/pages/companies/jobs-tab/mocks'

describe('Jobs Tab', () => {
  const { jobsTab } = new CompanyProfilePage()
  const { jobsSection, updateInvoiceNoteModal } = jobsTab

  beforeEach(() => {
    updateJobsTabMocks()

    jobsTab.visitTab()
  })

  describe('when user has permission', () => {
    it('shows the jobs tab', () => {
      jobsSection.jobsSection.should('exist')
    })
  })

  describe('when company has children', () => {
    it('shows the "View Subsidiaries" checkbox', () => {
      jobsSection.viewSubsidiariesCheckbox.should('exist')
    })
  })

  it('edits the job invoice note', () => {
    updateInvoiceNoteModal.editButton.click()
    updateInvoiceNoteModal.noteField.clear().type('Some invoice note')
    updateInvoiceNoteModal.submit()

    cy.getNotification().should(
      'have.text',
      'The invoice note was successfully updated.'
    )
  })
})
