import { updateCallRequestsPageStubs } from '~integration/mocks/schema-updates/call-requests'
import { FormModal } from '~integration/modules/modals'
import { CallRequestsPage } from '~integration/modules/pages'
import { getCallRequestOperationsMock } from '~integration/mocks/fragments'
import { enabledOperationMock } from '~integration/mocks/enabled-operation-mock'

const ENGAGEMENT_ID = '123'
const NAME = 'Ryan Bagley'
const REQUESTED_START_TIME = '2020-03-11T09:49:20+0000'
const OVERLAPPING_MEETING_NAME = 'Other Meeting Name'
const SCHEDULED_AT = '2019-11-11T06:11:28.160+03:00'

describe('Call Requests Page', () => {
  const page = new CallRequestsPage()
  const confirmationModal = new FormModal()

  describe('when claiming call request succeeds', () => {
    it('redirects to the company page', () => {
      updateCallRequestsPageStubs({
        name: NAME,
        requestedStartTime: REQUESTED_START_TIME,
        overlappingMeetings: {
          nodes: [
            {
              name: OVERLAPPING_MEETING_NAME,
              scheduledAt: SCHEDULED_AT
            }
          ]
        },
        operations: getCallRequestOperationsMock({
          claimCallbackRequest: enabledOperationMock()
        })
      })

      page.visit('/123?modal=claim')

      page.overlappingMeetingsText.contains(
        'The time requested by the client overlaps with your existing meeting'
      )
      page.requestedTimeText.contains(
        `Ryan Bagley has requested a call back on Mar 11, 2020 at 12:49 PM (UTC+03:00) Europe - Moscow.`
      )

      confirmationModal.clickButton('Claim Call')

      cy.url().should('include', `/engagements/${ENGAGEMENT_ID}`)
      cy.go('back').end()
    })
  })

  describe('when claiming company and call request succeeds', () => {
    it('redirects to the company page', () => {
      updateCallRequestsPageStubs({
        name: NAME,
        requestedStartTime: REQUESTED_START_TIME,
        overlappingMeetings: {
          nodes: [
            {
              name: OVERLAPPING_MEETING_NAME,
              scheduledAt: SCHEDULED_AT
            }
          ]
        },
        operations: getCallRequestOperationsMock({
          claimCallbackRequestWithClient: enabledOperationMock()
        })
      })

      page.visit()

      page.claimCallRequestButton.contains('Claim').click()

      page.overlappingMeetingsText.contains(
        'The time requested by the client overlaps with your existing meeting'
      )
      page.requestedTimeText.contains(
        `Ryan Bagley has requested a call back on Mar 11, 2020 at 12:49 PM (UTC+03:00) Europe - Moscow.`
      )
      confirmationModal.clickButton('Claim Company and Call')

      cy.url().should('include', `/engagements/${ENGAGEMENT_ID}`)
      cy.go('back').end()
    })
  })

  describe('when removing call request succeeds', () => {
    it('shows success notification', () => {
      updateCallRequestsPageStubs({
        operations: getCallRequestOperationsMock({
          removeCallbackRequest: enabledOperationMock()
        })
      })

      page.visit()

      page.removeCallRequestButton.contains('Remove').click()

      confirmationModal.comment.type('c')
      confirmationModal.submitButton.click()

      cy.getNotification()
        .should('have.text', 'The Call Request has been removed.')
        .find('button')
        .click()

      page.callRequestStatus.should('have.text', 'Removed')
    })
  })
})
