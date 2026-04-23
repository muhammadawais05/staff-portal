import {
  OfacStatus,
  OfacStatusChange,
  Staff
} from '@staff-portal/graphql/staff'

import TalentProfilePage from '~integration/modules/pages/talents/talent-profile-tab'
import { updateTalentProfileChangeOFACStatusStubs } from '~integration/mocks/schema-updates/talents'
import { ChangeOfacStatusModal } from '~integration/modules/pages/talents/talent-profile-tab/components'
import { getTalentOfacStatusDataResponse } from '~integration/mocks/responses'

describe('Talent Profile Tab > OFAC Compliance Section > Change OFAC Status', () => {
  const page = new TalentProfilePage()
  const changeOfacStatusModal = new ChangeOfacStatusModal()

  it('submits the modal', () => {
    updateTalentProfileChangeOFACStatusStubs()

    page.visit()

    page.ofacComplianceSection.changeOfacStatusButton.click()

    changeOfacStatusModal.selectOfacStatus('Investigation')
    changeOfacStatusModal.comment.type('c')

    updateTalentProfileChangeOFACStatusStubs({
      GetOfacStatusData: getTalentOfacStatusDataResponse({
        ofacStatus: OfacStatus.INVESTIGATION,
        ofacStatusChanges: {
          totalCount: 1,
          nodes: [
            {
              comment: 'test investigation',
              createdAt: '2022-04-26T18:38:46+03:00',
              status: OfacStatus.INVESTIGATION,
              performer: {
                id: 'VjEtU3RhZmYtMTAwMDEw',
                fullName: 'Cyp Ress',
                webResource: {
                  url: 'https://toptal.com'
                }
              } as Staff,
              __typename: 'OfacStatusChange'
            } as OfacStatusChange
          ]
        }
      })
    })

    changeOfacStatusModal.submit()

    cy.getNotification().should(
      'have.text',
      'The OFAC Status was successfully changed.'
    )

    cy.contains('Show History (1)').click()

    cy.getByTestId('ofac-status-change-comment').contains('test investigation')
  })
})
