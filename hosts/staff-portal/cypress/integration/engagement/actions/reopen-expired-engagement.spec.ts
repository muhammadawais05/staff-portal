import { EngagementStatus } from '@staff-portal/graphql/staff'
import { EngagementCumulativeStatus } from '@staff-portal/engagements'

import { Engagement } from '~integration/modules/pages/engagements'
import { updateReopenExpiredEngagementMocks } from '~integration/mocks/schema-updates/engagement'
import { BasicModal } from '~integration/modules/modals'

describe('Engagement page -> More -> Reopen Engagement and Approve Trial', () => {
  const page = new Engagement()
  const reopenEngagementModal = new BasicModal()

  it('Submits `Reopen Engagement and Approve Trial` modal', () => {
    updateReopenExpiredEngagementMocks()

    page.visit()

    page.moreButton().click()
    page.moreDropdown.contains('Reopen Engagement and Approve Trial').click()

    reopenEngagementModal.clickButton('Reopen and Approve Trial')
    updateReopenExpiredEngagementMocks({
      cumulativeStatus: EngagementCumulativeStatus.ACTIVE,
      status: EngagementStatus.ACTIVE
    })

    cy.getNotification().should(
      'have.text',
      'The engagement was successfully reopened.'
    )
  })
})
