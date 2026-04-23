import {
  EngagementBreakOperations,
  EngagementStatus
} from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks'
import { engagementBreaksMock } from '~integration/mocks/fragments/engagement-breaks-mock'
import { updateBreaksSectionMocks } from '~integration/mocks/schema-updates/engagement'
import { Engagement } from '~integration/modules/pages/engagements'
import { daysFromNow } from '~integration/utils'
import { ScheduleBreakModal } from '~integration/modules/pages/engagements/components'
import { getEngagementOperations } from '~integration/mocks/fragments/get-engagement-operations'

describe('Engagement page -> Breaks -> Edit Break', () => {
  const page = new Engagement()
  const scheduleBreakModal = new ScheduleBreakModal()

  const { breaksSection } = page

  describe('when the form information is correct', () => {
    it('submits the `Reschedule Break` modal', () => {
      updateBreaksSectionMocks({
        engagementBreak: engagementBreaksMock({
          startDate: '2021-09-16T00:00:00+00:00',
          endDate: '2021-09-18T00:00:00+00:00',
          operations: {
            rescheduleEngagementBreak: enabledOperationMock()
          } as EngagementBreakOperations
        }),
        engagement: {
          cumulativeStatus: 'active',
          status: EngagementStatus.ACTIVE,
          startDate: '2021-08-30',
          operations: getEngagementOperations({
            scheduleEngagementBreak: enabledOperationMock()
          })
        }
      })

      page.visit()

      breaksSection
        .engagementBreaksItems()
        .first()
        .should('contain.text', 'Sep 16, 2021 - Sep 18, 2021')

      breaksSection.editBreakButton().click()

      scheduleBreakModal.getMultipleDaysTab().click()
      scheduleBreakModal.fillEndDateWith(daysFromNow(8))

      scheduleBreakModal.submitButton.click()

      cy.getNotification().should(
        'have.text',
        'The Engagement Break was successfully updated.'
      )
    })
  })
})
