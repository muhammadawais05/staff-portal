import { BasePage } from '~integration/modules/pages'
import {
  TalentInfractionsSection,
  TalentHistoryAndHealthStatusSection,
  TalentPerformanceCoachingSection
} from './sections'

class TalentPerformanceTab extends BasePage {
  infractionsSection = new TalentInfractionsSection()
  healthStatusSection = new TalentHistoryAndHealthStatusSection()
  coachingSection = new TalentPerformanceCoachingSection()

  visit() {
    cy.visit('/talents/123#performance')
  }
}

export default TalentPerformanceTab
