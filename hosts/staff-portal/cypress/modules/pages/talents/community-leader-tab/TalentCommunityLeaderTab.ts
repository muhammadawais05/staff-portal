import { BasePage } from '~integration/modules/pages'
import { CommunityLeader } from './sections'

class TalentCommunityLeaderTab extends BasePage {
  communityLeaderSection = new CommunityLeader()

  visit() {
    cy.visit('/talents/123#community_leader')
  }
}

export default TalentCommunityLeaderTab
