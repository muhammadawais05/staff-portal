import { BasePage } from '~integration/modules/pages'
import {
  FinancialInformationSection,
  InDepthCompanyResearchSection,
  SocialMediaSection
} from './sections'

class WebAndSocialTabPage extends BasePage {
  inDepthCompanyResearchSection = new InDepthCompanyResearchSection()
  financialInformationSection = new FinancialInformationSection()
  socialMediaSection = new SocialMediaSection()

  visitTab() {
    return cy.visit('/clients/2385680#web_and_social')
  }
}

export default WebAndSocialTabPage
