import { JobListPage } from '~integration/modules/pages/jobs'
import { jobListPageStubs } from '~integration/mocks/request-stubs'

describe('Job List Page', () => {
  const page = new JobListPage()

  beforeEach(() => {
    cy.stubGraphQLRequests(jobListPageStubs())

    page.visit()
  })

  it('renders job list items', () => {
    cy.getByTestId('job-list-item').should('be.visible')

    cy.url().should('eq', Cypress.config().baseUrl + '/jobs')
  })
})
