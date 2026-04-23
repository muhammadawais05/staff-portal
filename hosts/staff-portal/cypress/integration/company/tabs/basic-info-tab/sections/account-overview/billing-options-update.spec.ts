import { updateClientBillingOptionsUpdate } from '~integration/mocks/schema-updates/companies'
import CompanyProfilePage from '~integration/modules/pages/companies'

describe('Update Billing Options Update', () => {
  const { basicInfoTab } = new CompanyProfilePage()
  const {
    accountOverviewSection: { billingOptionsUpdate }
  } = basicInfoTab

  describe('when a value is selected', () => {
    it('submits successfully and saves Billing Options Update', () => {
      updateClientBillingOptionsUpdate({
        billingOptionsUpdateEnabled: false
      })

      basicInfoTab.visitTab()

      billingOptionsUpdate.toggleBillingOptionsUpdate()
      billingOptionsUpdate.selectBillingOptionsUpdate('0')
      billingOptionsUpdate
        .getBillingOptionsUpdate()
        .should('have.text', 'Disabled')
    })
  })
})
