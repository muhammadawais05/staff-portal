import {
  updateExpireEngagementStubs,
  updatePostponeExpirationStubs
} from '~integration/mocks/schema-updates/engagement'
import { Engagement } from '~integration/modules/pages/engagements'
import { daysFromNow, ENTER_KEY } from '~integration/utils'
import { PostponeExpirationModal } from '~integration/modules/pages/engagements/components'
import { BasicModal } from '~integration/modules/modals'

describe('Engagement page -> Header -> Engagement Expiration', () => {
  const page = new Engagement()
  const postponeExpirationModal = new PostponeExpirationModal()
  const expireEngagementModal = new BasicModal()

  it('submits `Postpone Expiration` modal', () => {
    updatePostponeExpirationStubs()

    page.visit()

    page.postponeExpirationButton.click()

    postponeExpirationModal.expirationDateField
      .clear()
      .type(daysFromNow(7))
      .trigger('keydown', { keyCode: ENTER_KEY })
      .blur()
    postponeExpirationModal.comment.type('comment')

    postponeExpirationModal.submitButton.click()

    cy.getNotification().should(
      'have.text',
      'Interview expiration was postponed.'
    )
  })

  it('submits `Expire Engagement` modal', () => {
    updateExpireEngagementStubs()

    cy.reload()

    cy.getByTestId('expire-engagement-item').click()

    expireEngagementModal.clickButton('Expire Interview')

    cy.getNotification().should('have.text', 'Interview was marked as expired.')
  })
})
