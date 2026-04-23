import { encodeEntityId } from '@staff-portal/data-layer-service'

import {
  PublicationsSearchPage,
  PublicationsDetailsPage
} from '~integration/modules/pages/publications'
import {
  publicationsPageStubs,
  publicationsSearchPageStubs
} from '~integration/mocks/request-stubs'

describe('Publications Details Page', () => {
  const pageRequest = new PublicationsDetailsPage()
  const page = new PublicationsSearchPage()

  const REQUEST_ID = encodeEntityId('48', 'PublicationGig')
  const CLAIMER_NAME = 'John Doe'
  const CLAIMER_ID = encodeEntityId('123', 'Staff')
  const DESCRIPTION =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  const REQUEST_TITLE = 'My testing request title'
  const CANDIDATE_ID = encodeEntityId('306423', 'Talent')

  describe('When staff goes to the search page', () => {
    beforeEach(() => {
      cy.stubGraphQLRequests({
        ...publicationsPageStubs({
          claimerName: CLAIMER_NAME,
          claimerId: CLAIMER_ID,
          candidateId: CANDIDATE_ID,
          requestId: REQUEST_ID,
          requestTitle: REQUEST_TITLE,
          description: DESCRIPTION,
          isClaimed: true,
          isMatched: false
        }),
        ...publicationsSearchPageStubs({
          candidateId: CANDIDATE_ID,
          requestId: REQUEST_ID,
          requestTitle: REQUEST_TITLE,
          description: DESCRIPTION
        })
      })
      pageRequest.visit(REQUEST_ID)
    })

    it('can send reach out to candidate', () => {
      pageRequest.searchCandidatesButton.click()
      page.numberOfCandidates.should('contain.text', '(1)')
      page.requestDescription.should('contain', DESCRIPTION)
      page.sendReachOutButton.click()
      page.submitReachOutButton.click()
      page.sendReachOutButton.contains('Request was Sent')
    })
  })
})
