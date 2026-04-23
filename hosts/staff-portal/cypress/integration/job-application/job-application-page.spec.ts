import { JobApplicationPage } from '~integration/modules/pages/jobs-applications'
import { jobApplicationPageStubs } from '~integration/mocks/request-stubs'

describe('Job Application Page', () => {
  const page = new JobApplicationPage()

  beforeEach(() => {
    cy.stubGraphQLRequests(jobApplicationPageStubs())

    page.visit()
  })

  it('renders job application content', () => {
    page.visit()

    cy.getByTestId('job-application-content').should('be.visible')

    cy.url().should('eq', Cypress.config().baseUrl + '/job_applications/123')
  })
})
