import {
  OfacStatus,
  StatusMessage,
  StatusMessageDataEntry,
  StatusMessageSeverity,
  StatusMessageTag
} from '@staff-portal/graphql/staff'

import StaffProfilePage from '~integration/modules/pages/staff-profile'
import { updateStaffProfileOfacStatus } from '~integration/mocks/schema-updates/staff-profile'
import { ChangeOfacStatusModal } from '~integration/modules/modals'
import { ENTER_KEY } from '~integration/utils'
import {
  getStaffOfacStatusResponse,
  getStaffOfacStatusMessagesResponse,
  getStaffProfileResponse
} from '../../../../mocks/responses'

describe('Ofac Section', () => {
  const staffProfilePage = new StaffProfilePage()
  const ofacModal = new ChangeOfacStatusModal()

  it('change Ofac status', () => {
    updateStaffProfileOfacStatus()

    staffProfilePage.visit()

    staffProfilePage.changeOfacStatusButton.click()

    ofacModal.newOfacStatusField
      .click()
      .trigger('keydown', { keyCode: ENTER_KEY })

    ofacModal.commentField.type('comment')

    updateStaffProfileOfacStatus({
      GetOfacStatusData: getStaffOfacStatusResponse(
        [
          {
            comment: 'test investigation',
            createdAt: '2022-04-26T18:38:46+03:00',
            performer: {
              id: 'VjEtU3RhZmYtMTAwMDEw',
              fullName: 'Alexander Danilenko',
              webResource: {
                url: 'https://staging.toptal.net/platform/staff/staff/100010',
                __typename: 'Link'
              },
              __typename: 'Staff'
            },
            status: OfacStatus.INVESTIGATION,
            __typename: 'OfacStatusChange'
          }
        ],
        OfacStatus.INVESTIGATION
      ),
      GetStaffProfile: getStaffProfileResponse({
        ofacStatus: OfacStatus.INVESTIGATION
      }),
      GetNodeStatusMessages: getStaffOfacStatusMessagesResponse([
        {
          closeUrl: 'close',
          severity: StatusMessageSeverity.ALERT,
          sticky: false,
          storeKey: null,
          store: false,
          tag: StatusMessageTag.STAFF_OFAC_PROHIBITED,
          text: '<strong>OFAC investigation:</strong> <p>comment</p>',
          data: [
            {
              key: 'ofac_status',
              value: 'investigation',
              __typename: 'StatusMessageDataEntry'
            } as StatusMessageDataEntry,
            {
              key: 'comment',
              value: '<p>comment</p>',
              __typename: 'StatusMessageDataEntry'
            }
          ],
          __typename: 'StatusMessage'
        } as StatusMessage
      ])
    })

    ofacModal.submitButton.click()

    ofacModal.ofacStatusField.should(
      'have.text',
      'Investigation (verified via Visual Compliance)'
    )

    cy.get('div[role="alert"]')
      .first()
      .should('have.text', 'OFAC investigation: comment')

    cy.getNotification()
      .should('have.text', 'The OFAC Status was successfully changed.')
      .find('button')
      .click()

    cy.contains('Show History (1)').click()

    cy.getByTestId('ofac-status-change-comment').contains('test investigation')
  })
})
