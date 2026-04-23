import { BasePage } from '~integration/modules/pages'
import { WorkloadSection } from './sections'

class TalentWorkloadTab extends BasePage {
  workloadSection = new WorkloadSection()

  visit() {
    cy.visit('/talents/123#workload')
  }
}

export default TalentWorkloadTab
