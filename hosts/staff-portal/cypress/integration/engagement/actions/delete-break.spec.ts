import {
  EngagementBreakOperations,
  EngagementStatus
} from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks'
import { engagementBreaksMock } from '~integration/mocks/fragments/engagement-breaks-mock'
import { updateBreaksSectionMocks } from '~integration/mocks/schema-updates/engagement'
import { BasicModal } from '~integration/modules/modals'
import { Engagement } from '~integration/modules/pages/engagements'

describe('Engagement page -> Breaks -> Delete Break', () => {
  const page = new Engagement()
  const deleteBreakModal = new BasicModal()

  const { breaksSection } = page

  it('submits `Delete Break` modal and updates the `Breaks` section', () => {
    updateBreaksSectionMocks({
      engagementBreak: engagementBreaksMock({
        startDate: '2021-10-20T00:00:00+00:00',
        endDate: '2021-10-20T00:00:00+00:00',
        operations: {
          removeEngagementBreak: enabledOperationMock()
        } as EngagementBreakOperations
      }),
      engagement: {
        cumulativeStatus: 'on_break',
        status: EngagementStatus.ON_BREAK,
        startDate: '2021-11-01'
      }
    })

    page.visit()

    deleteBreakModal.self.should('not.exist')
    breaksSection.deleteBreakButton().click()

    deleteBreakModal.self.should(
      'contain.text',
      'Are you sure you want to cancel pause for this engagement?'
    )
    deleteBreakModal.self.should(
      'contain.text',
      "If the client's break affects billing cycles that have already been paid, all related invoices, payments, and commissions will be sent to the accounting team for review and updated accordingly."
    )
  })
})
