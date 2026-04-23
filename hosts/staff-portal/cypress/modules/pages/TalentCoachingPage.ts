import BasePage from './BasePage'

class TalentCoachingPage extends BasePage {
  visit() {
    return cy.visit('/talent_coaching')
  }

  getEmptyMessage() {
    return cy.getByTestId('no-search-results')
  }
}

export default TalentCoachingPage
