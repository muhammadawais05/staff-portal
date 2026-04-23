import { BasePage } from '~integration/modules/pages'

class JobsSection extends BasePage {
  get jobsSection() {
    return cy.getByTestId('jobs-section')
  }

  get viewSubsidiariesCheckbox() {
    return cy.getByTestId('jobs-tab-actions-view-subsidiaries')
  }
}

export default JobsSection
