import { updateClientLeadStatusMocks } from '~integration/mocks/schema-updates/companies'
import CompanyProfilePage from '~integration/modules/pages/companies'

describe('Update Lead status', () => {
  const { basicInfoTab } = new CompanyProfilePage()
  const {
    accountOverviewSection: { leadStatus }
  } = basicInfoTab

  describe('when save button is clicked', () => {
    it('submits successfully and saves Lead status', () => {
      updateClientLeadStatusMocks({
        enterpriseLeadStatus: 'Client Unresponsive',
        enterpriseFollowUpStatus: 'Assemble Documentation'
      })

      basicInfoTab.visitTab()

      leadStatus.getLeadStatusEditButton().click()
      //TODO: remove this when investigation starts https://toptal-core.atlassian.net/browse/SPB-2726
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1000)
      leadStatus.selectStatus('Client Unresponsive')
      leadStatus.selectNextAction('Assemble Documentation')
      leadStatus.getLeadStatusCommentField().type('Some interesting comment.')
      leadStatus.submitButton.click()
      leadStatus.getFieldViewer().should('have.text', 'Client Unresponsive')

      cy.getNotification().should(
        'contain',
        'The Lead Status was successfully updated.'
      )
    })
  })
})
