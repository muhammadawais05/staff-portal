import { BusinessTypes } from '@staff-portal/graphql/staff'

import { updateClientBusinessType } from '~integration/mocks/schema-updates/companies'
import CompanyProfilePage from '~integration/modules/pages/companies'

describe('Update Business Type', () => {
  const { basicInfoTab } = new CompanyProfilePage()
  const {
    accountOverviewSection: { businessType }
  } = basicInfoTab

  describe('when a value is selected', () => {
    it('submits successfully and saves Business Type', () => {
      updateClientBusinessType({
        businessTypeV2: BusinessTypes.SMALL_BUSINESS
      })

      basicInfoTab.visitTab()

      businessType.toggleBusinessType()
      businessType.selectBusinessType(BusinessTypes.SMALL_BUSINESS)
      businessType.getBusinessType().should('have.text', 'Small business')
    })
  })
})
