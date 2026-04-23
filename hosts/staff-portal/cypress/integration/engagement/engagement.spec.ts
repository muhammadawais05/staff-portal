import { Engagement } from '~integration/modules/pages/engagements'
import { updateEngagementPageStubs } from '~integration/mocks/schema-updates/engagement'

describe('Engagement page', () => {
  const page = new Engagement()

  it('renders engagement page', () => {
    updateEngagementPageStubs()

    page.visit()

    cy.contains('Position Job Title at Client Name')

    page
      .getPageContent()
      .find('> div')
      .should('not.contain.text', 'Loading...')
      .should('have.length', 10)

    page
      .getSectionByIndex(0)
      .invoke('data', 'testid')
      .should('eq', 'engagement-company-section')

    page
      .getSectionByIndex(1)
      .invoke('data', 'testid')
      .should('eq', 'engagement-talent-section')

    page
      .getSectionByIndex(2)
      .invoke('data', 'testid')
      .should('eq', 'engagement-breaks-section')

    page
      .getSectionByIndex(3)
      .invoke('data', 'testid')
      .should('eq', 'engagement-job-details-section')

    page
      .getSectionByIndex(4)
      .invoke('data', 'testid')
      .should('eq', 'engagement-status-section')

    page
      .getSectionByIndex(5)
      .findByTestId('engagement-interviews-section')
      .should('exist')

    page.getSectionByIndex(6).findByTestId('Feedback-section').should('exist')

    page
      .getSectionByIndex(7)
      .findByTestId('engagement-client-interview-feedback-section')
      .should('exist')

    page
      .getSectionByIndex(8)
      .findByTestId('engagement-talent-interview-feedback-section')
      .should('exist')

    page
      .getSectionByIndex(9)
      .invoke('data', 'testid')
      .should('eq', 'engagement-billing-section')
  })
})
