import { ClientClaimerCategory } from '@staff-portal/graphql/staff'

import CompanyProfilePage from '~integration/modules/pages/companies'
import { updateClaimerCategoryMocks } from '~integration/mocks/schema-updates/companies'

describe('Claimer category', () => {
  const { basicInfoTab } = new CompanyProfilePage()
  const {
    internalTeamSection: { claimerCategory }
  } = basicInfoTab

  describe('when selecting a value', () => {
    it('saves successfully and updates the field', () => {
      updateClaimerCategoryMocks({
        claimerCategory: ClientClaimerCategory.PRIORITY
      })

      basicInfoTab.visitTab()

      claimerCategory.toggleClaimerCategory()
      claimerCategory.selectClaimerCategory(ClientClaimerCategory.PRIORITY)
      claimerCategory.getClaimerCategory().should('have.text', 'Priority')
    })
  })
})
