import { updateClientLikelihoodToCloseMocks } from '~integration/mocks/schema-updates/companies'
import CompanyProfilePage from '~integration/modules/pages/companies'

describe('Update Likelihood to close', () => {
  const { basicInfoTab } = new CompanyProfilePage()
  const {
    accountOverviewSection: { likelihoodToClose }
  } = basicInfoTab

  describe('when save button is clicked', () => {
    it('submits successfully and saves Likelihood to close', () => {
      updateClientLikelihoodToCloseMocks({
        likelihoodToClose: 40
      })

      basicInfoTab.visitTab()

      likelihoodToClose.getToggleButton().click()
      //TODO: remove this when investigation starts https://toptal-core.atlassian.net/browse/SPB-2726
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1000)
      likelihoodToClose.selectLikelihoodToClose('40%')
      likelihoodToClose
        .getLikelihoodToCloseCommentField()
        .type('Some interesting comment.')
      likelihoodToClose.getConfirmButton().click()
      likelihoodToClose.getFieldViewer().should('have.text', '40%')
      cy.getNotification().should(
        'contain',
        'The Likelihood to close was successfully updated.'
      )
    })
  })
})
