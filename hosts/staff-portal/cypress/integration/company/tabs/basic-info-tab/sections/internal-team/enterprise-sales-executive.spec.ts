import { BusinessTypes } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import CompanyProfilePage from '~integration/modules/pages/companies'
import { updateClientEnterpriseSalesExecutiveMocks } from '~integration/mocks/schema-updates/companies'

describe('EnterpriseSalesExecutive', () => {
  const { basicInfoTab } = new CompanyProfilePage()
  const {
    internalTeamSection: { enterpriseSalesExecutive }
  } = basicInfoTab

  describe('when selecting a value', () => {
    it('saves successfully and updates the field', () => {
      updateClientEnterpriseSalesExecutiveMocks({
        businessTypeV2: BusinessTypes.ENTERPRISE_BUSINESS
      })

      basicInfoTab.visitTab()

      enterpriseSalesExecutive.toggleEnterpriseSalesExecutive()
      enterpriseSalesExecutive.selectEnterpriseSalesExecutiveValue(
        encodeEntityId('3', 'Staff')
      )
      enterpriseSalesExecutive
        .getEnterpriseSalesExecutive()
        .should('have.text', 'Amos Burton')
    })
  })
})
