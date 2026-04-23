import { SoftSkillsSection } from '~integration/modules/pages/talents/components'

export default class TalentListItem {
  softSkillsSection = new SoftSkillsSection()

  get addToFavoritesButton() {
    return cy.getByTestId('add-to-favorites-button')
  }

  get removeFromFavoritesButton() {
    return cy.getByTestId('remove-from-favorites-button')
  }

  get requestAvailabilityButton() {
    return cy.getByTestId('request-availability-button')
  }

  get talentListItemTabs() {
    return cy.getByTestId('talent-list-item-tabs')
  }

  get generalTab() {
    return cy.getByTestId('general-tab')
  }

  get workloadTab() {
    return cy.getByTestId('workload-tab')
  }

  get statsTab() {
    return cy.getByTestId('stats-tab')
  }

  get employmentsTab() {
    return cy.getByTestId('employments-tab')
  }

  get workExperienceTab() {
    return cy.getByTestId('work-experience-tab')
  }

  get qualityRatingsTab() {
    return cy.getByTestId('quality-ratings-tab')
  }

  get generalSection() {
    return cy.getByTestId('general-section')
  }

  get workloadSection() {
    return cy.getByTestId('workload-section')
  }

  get statsSection() {
    return cy.getByTestId('stats-section')
  }

  get employmentsSection() {
    return cy.getByTestId('employments-section')
  }

  get workExperienceSection() {
    return cy.getByTestId('work-experience-section')
  }

  get qualityRatingsSection() {
    return cy.getByTestId('quality-ratings-section')
  }
}
