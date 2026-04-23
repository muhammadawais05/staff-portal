import { BusinessTypes } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import CompanyProfilePage from '~integration/modules/pages/companies'
import { updateAccountManagerMocks } from '~integration/mocks/schema-updates/companies'

describe('AccountManager', () => {
  const { basicInfoTab } = new CompanyProfilePage()
  const {
    internalTeamSection: { accountManager }
  } = basicInfoTab

  describe('when selecting a value', () => {
    it('saves successfully and updates the field', () => {
      updateAccountManagerMocks({
        businessTypeV2: BusinessTypes.SMALL_BUSINESS
      })

      basicInfoTab.visitTab()

      accountManager.toggleAccountManager()

      // TODO: remove this after https://toptal-core.atlassian.net/browse/SPB-2789 is finished
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(500)
      accountManager.selectAccountManagerValue(encodeEntityId('3', 'Staff'))
      accountManager.getAccountManager().should('have.text', 'Charles Boyle')
    })
  })
})
