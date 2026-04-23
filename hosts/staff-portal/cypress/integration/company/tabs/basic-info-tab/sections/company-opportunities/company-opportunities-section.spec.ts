import { encodeEntityId } from '@staff-portal/data-layer-service'

import { opportunityNodeMock } from '~integration/mocks/fragments'
import { updateClientCompanyOpportunitiesStubs } from '~integration/mocks/schema-updates/companies'
import CompanyProfilePage from '~integration/modules/pages/companies'

const opportunityName1 = 'Coby Kavanaugh - React Node Dev'
const opportunityName2 = 'Toby Ravement - Ruby Dev'
const opportunity1 = opportunityNodeMock({
  node: {
    id: encodeEntityId('123', 'Opportunity'),
    name: opportunityName1
  }
}).node()
const opportunity2 = opportunityNodeMock({
  node: {
    id: encodeEntityId('124', 'Opportunity'),
    name: opportunityName2
  }
}).node()

describe('Company Profile -> Basic Info tab -> Company Opportunities section', () => {
  const { basicInfoTab } = new CompanyProfilePage()

  const { companyOpportunitiesSection } = basicInfoTab

  it('hides and shows entries based on Show Subsidiary Companies checkbox state', () => {
    updateClientCompanyOpportunitiesStubs([opportunity1])

    basicInfoTab.visitTab()

    companyOpportunitiesSection.getTableRows().its('length').should('eq', 1)
    companyOpportunitiesSection
      .getTableRows()
      .contains(opportunityName2)
      .should('not.exist')

    updateClientCompanyOpportunitiesStubs([opportunity1, opportunity2])
    companyOpportunitiesSection.toggleShowSubsidiaryCompaniesCheckbox()
    companyOpportunitiesSection.getTableRows().its('length').should('eq', 2)
    companyOpportunitiesSection
      .getTableRows()
      .contains(opportunityName1)
      .should('be.visible')

    companyOpportunitiesSection
      .getTableRows()
      .contains(opportunityName2)
      .should('be.visible')

    updateClientCompanyOpportunitiesStubs([opportunity1])
    companyOpportunitiesSection.toggleShowSubsidiaryCompaniesCheckbox()
    companyOpportunitiesSection.getTableRows().its('length').should('eq', 1)
    companyOpportunitiesSection
      .getTableRows()
      .contains(opportunityName2)
      .should('not.exist')
  })
})
