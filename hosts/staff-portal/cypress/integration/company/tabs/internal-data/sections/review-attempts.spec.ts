import { internalDataMocks } from '~integration/modules/pages/companies/internal-data-tab/mocks'
import CompanyProfilePage from '~integration/modules/pages/companies'

describe('Internal Data Tab', () => {
  const { internalDataTab } = new CompanyProfilePage()
  const { reviewAttemptsSection } = internalDataTab

  beforeEach(() => {
    cy.updateStaffMocks(internalDataMocks())

    internalDataTab.visitTab()
  })

  describe('Review Attempts', () => {
    describe('when expand section button is clicked', () => {
      it('shows review attempts list', () => {
        reviewAttemptsSection.reviewAttemptsList().should('not.exist')
        reviewAttemptsSection.expandReviewAttemptsSection()
        reviewAttemptsSection.reviewAttemptsList().should('exist')
      })
    })
  })
})
