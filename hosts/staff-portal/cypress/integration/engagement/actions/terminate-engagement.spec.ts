import { formatDate } from '@staff-portal/date-time-utils'

import { Engagement } from '~integration/modules/pages/engagements'
import { ENTER_KEY } from '~integration/utils'
import { updateTerminateEngagementStubs } from '~integration/mocks/schema-updates/engagement'
import { TerminateEngagement } from '~integration/modules/pages/engagements/components'

// eslint-disable-next-line @miovision/disallow-date/no-new-date
const newDate = new Date()

describe('Engagement page - Terminate Engagement', () => {
  const page = new Engagement()
  const terminateEngagementModal = new TerminateEngagement()

  describe('when the form information is correct', () => {
    it('triggers the extra fields and submits the modal', () => {
      updateTerminateEngagementStubs()

      page.visit()

      page.moreButton().click()
      page.moreDropdown.contains('End Engagement').click()

      terminateEngagementModal
        .getReasonField()
        .focus()
        .click()
        .trigger('keydown', { keyCode: ENTER_KEY })
      terminateEngagementModal
        .getSubReasonField()
        .click()
        .trigger('keydown', { keyCode: ENTER_KEY })
      terminateEngagementModal.getDetailsField().type('Some details')
      terminateEngagementModal
        .getTalentSwapField()
        .click()
        .trigger('keydown', { keyCode: ENTER_KEY })

      terminateEngagementModal.submitButton.click()

      cy.getNotification().should(
        'have.text',
        `The Job was successfully scheduled to end on ${formatDate(newDate)}.`
      )
    })
  })
})
