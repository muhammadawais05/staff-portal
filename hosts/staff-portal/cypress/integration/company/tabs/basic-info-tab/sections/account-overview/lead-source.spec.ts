import { LeadSource } from '@staff-portal/graphql/staff'

import { updateClientLeadSource } from '~integration/mocks/schema-updates/companies'
import CompanyProfilePage from '~integration/modules/pages/companies'

describe('Update Lead Source', () => {
  const { basicInfoTab } = new CompanyProfilePage()
  const {
    accountOverviewSection: { leadSource }
  } = basicInfoTab

  describe('when a value is selected', () => {
    it('submits successfully and saves Lead Source', () => {
      updateClientLeadSource({
        leadSource: LeadSource.EVENT
      })

      basicInfoTab.visitTab()

      leadSource.toggleLeadSource()
      leadSource.selectLeadSource(LeadSource.EVENT)
      leadSource.getLeadSource().should('have.text', 'Event')
    })
  })
})
