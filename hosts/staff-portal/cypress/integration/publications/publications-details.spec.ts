import { encodeEntityId } from '@staff-portal/data-layer-service'

import { PublicationsDetailsPage } from '~integration/modules/pages/publications'
import { publicationsPageStubs } from '~integration/mocks/request-stubs'
import {
  getGigResponse,
  getMatchedGigResponse
} from '~integration/mocks/responses'

describe('Publications Details Page', () => {
  const page = new PublicationsDetailsPage()

  const REQUEST_ID = encodeEntityId('48', 'PublicationGig')
  const CLAIMER_NAME = 'John Doe'
  const CLAIMER_ID = encodeEntityId('123', 'Staff')
  const DESCRIPTION =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  const REQUEST_TITLE = 'My testing request title'
  const CANDIDATE_ID = encodeEntityId('306423', 'Talent')

  const stubRequest = (
    stubGig?: Partial<ReturnType<typeof getMatchedGigResponse>['data']['node']>,
    isMatched = false
  ) => {
    const request = isMatched
      ? getMatchedGigResponse(
          CLAIMER_NAME,
          CLAIMER_ID,
          REQUEST_ID,
          DESCRIPTION,
          REQUEST_TITLE
        )
      : getGigResponse(
          CLAIMER_NAME,
          CLAIMER_ID,
          REQUEST_ID,
          DESCRIPTION,
          REQUEST_TITLE,
          true
        )

    cy.stubGraphQLRequests({
      GetGig: {
        data: {
          node: {
            ...request.data.node,
            ...stubGig
          }
        }
      }
    })
  }

  describe("When staff go to the request's details", () => {
    beforeEach(() => {
      cy.stubGraphQLRequests({
        ...publicationsPageStubs({
          claimerName: CLAIMER_NAME,
          claimerId: CLAIMER_ID,
          candidateId: CANDIDATE_ID,
          requestId: REQUEST_ID,
          requestTitle: REQUEST_TITLE,
          description: DESCRIPTION,
          isClaimed: false,
          isMatched: false
        })
      })
      page.visit(REQUEST_ID)
    })

    it('can claim the request', () => {
      page.requestStatus.should('contain.text', 'Pending Claim')
      stubRequest()
      page.claimButton.click()
      page.claimedByField.should('contain.text', CLAIMER_NAME)
      page.searchCandidatesButton.should('be.visible')
      page.requestStatus.should('contain.text', 'Pending Candidate')
    })
  })

  describe('When staff goes to the claimed request', () => {
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
        })
      })
      page.visit(REQUEST_ID)
    })

    it('can close the request', () => {
      page.showMoreLink.click()
      stubRequest({ status: 'CLOSED' })
      page.closeButton.click()
      page.closeReasonField.type('Test reason')
      page.submitCloseReasonButton.click()
      page.requestStatus.should('contain.text', 'Closed')
    })

    describe('When staff goes to request with introduced candidate', () => {
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
            isMatched: true
          })
        })
        page.visit(REQUEST_ID)
      })

      it('can mark the request as fullfilled', () => {
        page.markAsFullfilledButton.should('be.visible')
        stubRequest({ status: 'COMPLETED' }, true)
        page.markAsFullfilledButton.click()
        page.requestStatus.should('contain.text', 'Completed')
      })

      it('can close the request', () => {
        page.showMoreLink.click()
        stubRequest({ status: 'CLOSED' }, true)
        page.closeButton.click()
        page.closeReasonField.type('Test reason')
        page.submitCloseReasonButton.click()
        page.requestStatus.should('contain.text', 'Closed')
      })
    })
  })
})
