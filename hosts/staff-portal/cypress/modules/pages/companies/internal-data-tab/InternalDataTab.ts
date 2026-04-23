import { BasePage } from '~integration/modules/pages'
import {
  InvestigationsSection,
  ReviewAttemptsSection,
  SystemInformationSection
} from './sections'

class InternalDataTabPage extends BasePage {
  investigationsSection = new InvestigationsSection()
  reviewAttemptsSection = new ReviewAttemptsSection()
  systemInformationSection = new SystemInformationSection()

  visitTab() {
    cy.visit('/clients/2385680#internal_data')
  }
}

export default InternalDataTabPage
