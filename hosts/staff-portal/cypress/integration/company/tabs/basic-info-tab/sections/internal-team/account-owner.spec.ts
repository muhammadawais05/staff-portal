import { BusinessTypes } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import CompanyProfilePage from '~integration/modules/pages/companies'
import { updateClientAccountOwnerMocks } from '~integration/mocks/schema-updates/companies'

describe('AccountOwner', () => {
  const { basicInfoTab } = new CompanyProfilePage()
  const {
    internalTeamSection: { accountOwner }
  } = basicInfoTab

  describe('when selecting a value', () => {
    it('saves successfully and updates the field', () => {
      updateClientAccountOwnerMocks({
        businessTypeV2: BusinessTypes.ENTERPRISE_BUSINESS
      })

      basicInfoTab.visitTab()

      accountOwner.toggleAccountOwner()
      accountOwner.selectAccountOwnerValue(encodeEntityId('3', 'Staff'))
      accountOwner.getAccountOwner().should('have.text', 'James Holden')
    })
  })
})
