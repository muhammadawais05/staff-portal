import { BasePage } from '~integration/modules/pages'
import {
  AccountOverviewSection,
  InternalTeamSection,
  LinkedCompaniesSection,
  CompanyOpportunitiesSection,
  RelatedTasksSection
} from './sections'

class BasicInfoTab extends BasePage {
  accountOverviewSection = new AccountOverviewSection()
  internalTeamSection = new InternalTeamSection()
  linkedCompaniesSection = new LinkedCompaniesSection()
  companyOpportunitiesSection = new CompanyOpportunitiesSection()
  relatedTasksSection = new RelatedTasksSection()

  visitTab() {
    cy.visit('/clients/123#profile')
  }
}

export default BasicInfoTab
