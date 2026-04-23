import { JobPage } from '~integration/modules/pages/jobs'
import {
  updateViewPitchSnippetsMocks,
  updateRejectCandidateIntroDraftsMocks
} from '~integration/mocks/schema-updates/job'
import { BasicModal } from '~integration/modules/modals'

describe('Job page -> Draft Engagements Section', () => {
  const page = new JobPage()
  const modal = new BasicModal()
  const { candidateIntroDraftsSection } = page

  it('displays `Draft Engagements` section and `View Pitch Snippets` button', () => {
    updateViewPitchSnippetsMocks()

    page.visit()

    candidateIntroDraftsSection
      .getCandidateIntroDraftsRow()
      .should('have.length', 1)
    candidateIntroDraftsSection.getViewPitchSnippetsButton().click()

    cy.getByTestId('GeneratePitchSnippetsModal-submit-button').realClick()

    cy.getNotification().should(
      'have.text',
      'Pitch snippet copied to clipboard.'
    )

    cy.window()
      .its('navigator.clipboard')
      .invoke('readText')
      .should(
        'contain',
        'Talent: Some Full Name\n\nProfile: https://example.com/resume\n\nTalent Rate: $50.00/h\n\nAvailability: FT (5/null)\n\nLocation: \n\n'
      )
  })

  it('displays `Draft Engagements` section and `Reject with Feedback` button', () => {
    updateRejectCandidateIntroDraftsMocks()

    page.visit()

    candidateIntroDraftsSection.getMoreButton().click()
    candidateIntroDraftsSection.getRejectDraftEngagement().click()
    modal.clickButton('Cancel')
  })
})
