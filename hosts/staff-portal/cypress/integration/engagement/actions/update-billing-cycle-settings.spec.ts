import { Engagement } from '~integration/modules/pages/engagements'
import { updateBillingCycleSettingsStubs } from '~integration/mocks/schema-updates/engagement'
import { UpdateBillingCycleSettings } from '~integration/modules/pages/engagements/components'

describe('Engagement -> More -> Update Billing Cycle Settings', () => {
  const page = new Engagement()
  const updateBillingCycleSettings = new UpdateBillingCycleSettings()

  it('Submits `Update Billing Cycle Settings` modal', () => {
    updateBillingCycleSettingsStubs()

    page.visit()

    page.moreButton().click()
    page.moreDropdown.contains('Update Billing Cycle Settings').click()

    updateBillingCycleSettings
      .getBillCycleField()
      .should('have.value', 'Weekly')

    updateBillingCycleSettings.submitButton.click()

    cy.getNotification().should(
      'have.text',
      'The billing cycle settings were successfully updated.'
    )
  })
})
