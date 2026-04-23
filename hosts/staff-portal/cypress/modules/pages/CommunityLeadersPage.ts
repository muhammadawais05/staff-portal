import BasePage from './BasePage'

class CommunityLeadersPage extends BasePage {
  visit(path?: string) {
    if (path) {
      cy.visit('/community_leaders' + path)
    } else {
      cy.visit('/community_leaders')
    }
  }

  get emptyMessage() {
    return cy.getByTestId('no-search-results')
  }

  get content() {
    return cy.getByTestId('content-body')
  }

  get sortFeaturedCommunityLeader() {
    return cy.getByTestId('community-leader-sorted')
  }

  get searchField() {
    return cy.getByTestId('filters-search-bar')
  }

  get pauseCommunityLeaderApplication() {
    return this.content.find('button').contains('Pause Application')
  }

  get removesFromFeaturedCommunityLeader() {
    return this.content.find('button').contains('Remove From Featured')
  }
}

export default CommunityLeadersPage
