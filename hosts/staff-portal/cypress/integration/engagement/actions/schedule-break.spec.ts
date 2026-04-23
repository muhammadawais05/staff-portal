import { EngagementStatus } from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks'
import { getEngagementOperations } from '~integration/mocks/fragments/get-engagement-operations'
import { updateBreaksSectionMocks } from '~integration/mocks/schema-updates/engagement'
import { Engagement } from '~integration/modules/pages/engagements'
import { ScheduleBreakModal } from '~integration/modules/pages/engagements/components'
import { daysFromNow, ENTER_KEY } from '~integration/utils'

describe('Engagement page -> More -> Schedule Break', () => {
  const page = new Engagement()
  const scheduleBreakModal = new ScheduleBreakModal()

  describe('when the form information is correct', () => {
    it('sends Multi-day Schedule Engagement Break and displays the success notification message', () => {
      updateBreaksSectionMocks({
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

      page.moreButton().click()
      page.moreDropdown.contains('Schedule Break').click()

      scheduleBreakModal.getSingleDayTab().click()
      scheduleBreakModal.getEndDateField().should('have.length', 0)

      scheduleBreakModal.getMultipleDaysTab().click()

      scheduleBreakModal.fillStartDateWith(daysFromNow(7))
      scheduleBreakModal.fillEndDateWith(daysFromNow(8))

      scheduleBreakModal
        .getReasonField()
        .focus()
        .click()
        .trigger('keydown', { keyCode: ENTER_KEY })
      scheduleBreakModal.comment.clear().type('Some details')
      scheduleBreakModal.messageToClientTextField
        .clear()
        .type('Nice to meet you!')

      scheduleBreakModal.submitButton.click()

      cy.getNotification().should(
        'have.text',
        'The Engagement Break was successfully scheduled.'
      )
    })
  })
})
