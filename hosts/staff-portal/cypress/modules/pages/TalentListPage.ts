import { JobFavoriteCandidatesWidget } from '~integration/modules/pages/talents/talent-list/components'
import BasePage from './BasePage'

class TalentListPage extends BasePage {
  jobFavoritesWidget = new JobFavoriteCandidatesWidget()

  visit() {
    cy.visit('/talents')
  }

  visitWithJob() {
    cy.visit('/talents?job_id=280820')
  }

  get emptyMessage() {
    return cy.getByTestId('no-search-results')
  }
}

export default TalentListPage
