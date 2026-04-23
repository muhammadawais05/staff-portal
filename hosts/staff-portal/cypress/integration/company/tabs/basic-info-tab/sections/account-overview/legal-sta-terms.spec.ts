import CompanyProfilePage from '~integration/modules/pages/companies'
import { updateLegalStaTermsStubs } from '~integration/mocks/schema-updates/companies'

describe('Legal STA Terms', () => {
  const { basicInfoTab } = new CompanyProfilePage()
  const {
    accountOverviewSection: { legalStaTerms }
  } = basicInfoTab

  describe('when clicking on the `View Term Details` button', () => {
    it('opens the modal', () => {
      updateLegalStaTermsStubs()

      basicInfoTab.visitTab()

      legalStaTerms.modalButton.click()
      legalStaTerms.signedOnField.should('contain.text', 'Nov 5, 2019')
    })
  })
})
