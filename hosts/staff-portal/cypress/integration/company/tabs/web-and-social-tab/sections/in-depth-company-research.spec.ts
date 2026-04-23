import CompanyProfilePage from '~integration/modules/pages/companies'
import { getClientOperations } from '~integration/mocks/fragments'
import {
  updateWebAndSocialTabMocks,
  updatePatchClientProfileMutation
} from '~integration/modules/pages/companies/web-and-social-tab/mocks/web-and-social-tab-mocks'
import { enabledOperationMock } from '~integration/mocks'

describe('when operations for editing are enabled', () => {
  const { webAndSocialTab } = new CompanyProfilePage()
  const { inDepthCompanyResearchSection: section } = webAndSocialTab

  beforeEach(() => {
    updateWebAndSocialTabMocks({
      operations: getClientOperations({
        patchClientProfile: enabledOperationMock()
      })
    })

    webAndSocialTab.visitTab()
  })

  describe('when value is entered in Year Founded', () => {
    it('saves the entered value', () => {
      const foundingYear = '2020'

      updatePatchClientProfileMutation({ foundingYear })

      section.editFoundingYear()
      section.setFoundingYear(foundingYear).save()
      section.getFoundingYear().should('contain', foundingYear)
    })
  })

  describe('when new values selected in Revenue', () => {
    it('saves selected value', () => {
      const revenueRange = 'Greater than $5B'

      updatePatchClientProfileMutation({ revenueRange })

      section.editRevenueRange()
      section.setRevenueRange(revenueRange)

      section.getRevenueRange().should('contain', revenueRange)
    })
  })

  describe('when new values selected in Industry', () => {
    it('saves selected value', () => {
      const industry = 'Industry'

      updatePatchClientProfileMutation({
        industry
      })

      section.editIndustry()
      section.setIndustry(industry)

      section.getIndustry().should('contain', industry)
    })
  })

  describe('when value is entered in Total Employees', () => {
    it('saves the entered value', () => {
      const employeeCount = 240

      updatePatchClientProfileMutation({
        internalEmployeeCount: employeeCount
      })

      section.editEmployeeCountEstimation()

      section.setEmployeeCountEstimation(`${employeeCount}`).save()
      section.getEmployeeCountEstimation().should('contain', employeeCount)
    })
  })
})
