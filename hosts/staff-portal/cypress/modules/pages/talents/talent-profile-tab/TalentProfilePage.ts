import { BasePage } from '~integration/modules/pages'
import {
  SoftSkillsSection,
  TalentMoreActions,
  TalentHeaderActions
} from '~integration/modules/pages/talents/components'
import { RoleFlags } from '~integration/modules/components'
import {
  ContractsAndAgreementsSection,
  GeneralSection,
  RelatedTasksSection,
  OfacComplianceSection,
  SpecializationApplicationsSection,
  TalentScreeningSpecialistStatusSection
} from './sections'

class TalentProfilePage extends BasePage {
  generalSection = new GeneralSection()
  ofacComplianceSection = new OfacComplianceSection()
  relatedTasksSection = new RelatedTasksSection()
  softSkillsSection = new SoftSkillsSection()
  contractsAndAgreementsSection = new ContractsAndAgreementsSection()
  moreActions = new TalentMoreActions()
  specializationApplicationsSection = new SpecializationApplicationsSection()
  talentScreeningSpecialistStatusSection =
    new TalentScreeningSpecialistStatusSection()
  headerActions = new TalentHeaderActions()
  roleFlags = new RoleFlags()

  visit() {
    cy.visit('/talents/123')
  }

  visitWithJob() {
    cy.visit('/talents/123?job_id=282896')
  }

  get content() {
    return cy.getByTestId('talent-profile-tab')
  }

  get moreActionsButton() {
    return cy.getByTestId('more-button')
  }
}

export default TalentProfilePage
