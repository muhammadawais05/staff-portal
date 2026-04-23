import { EngagementStatus } from '@staff-portal/graphql/staff'
import { EngagementCumulativeStatus } from '@staff-portal/engagements'

import { hiddenOperationMock } from '~integration/mocks/hidden-operation-mock'
import { updateRestoreEngagementStubs } from '~integration/mocks/schema-updates/engagement'
import { FormModal } from '~integration/modules/modals'
import { Engagement } from '~integration/modules/pages/engagements'

describe('Engagement Page -> Restore Engagement header actions', () => {
  const engagementPage = new Engagement()
  const modal = new FormModal()

  it('restores engagement', () => {
    updateRestoreEngagementStubs()

    engagementPage.visit()

    // test restore expired engagement
    engagementPage.statusSection.getStatus().should('contain.text', 'Expired')
    engagementPage.restoreExpiredInterviewButton.click()
    // TODO: This is a workaround and needs fixing.
    cy.getByTestId('modal-input').type('S')

    updateRestoreEngagementStubs({
      engagement: {
        status: EngagementStatus.ACTIVE,
        cumulativeStatus: EngagementCumulativeStatus.ACTIVE
      },
      operations: {
        restoreExpiredEngagement: hiddenOperationMock()
      }
    })

    modal.submitButton.click()

    cy.getNotification().should(
      'have.text',
      'The Interview was successfully restored.'
    )
    cy.getNotification().find('button').click()

    engagementPage.statusSection.getStatus().should('contain.text', 'Active')
    engagementPage.restoreExpiredInterviewButton.should('not.exist')

    // test restore rejected engagement
    engagementPage.restoreRejectedInterviewButton.click()
    // TODO: This is a workaround and needs fixing.
    cy.getByTestId('modal-input').type('S')

    updateRestoreEngagementStubs({
      operations: {
        restoreExpiredEngagement: hiddenOperationMock(),
        restoreRejectedEngagement: hiddenOperationMock()
      }
    })

    modal.submitButton.click()

    cy.getNotification().should(
      'have.text',
      'The Interview was successfully restored.'
    )

    engagementPage.restoreRejectedInterviewButton.should('not.exist')

    // test restore cancelled engagement
    engagementPage.restoreCancelledInterviewButton.click()
    // TODO: This is a workaround and needs fixing.
    cy.getByTestId('modal-input').type('S')

    updateRestoreEngagementStubs({
      operations: {
        restoreExpiredEngagement: hiddenOperationMock(),
        restoreRejectedEngagement: hiddenOperationMock(),
        restoreCancelledEngagement: hiddenOperationMock()
      }
    })

    modal.submitButton.click()

    cy.getNotification().should(
      'have.text',
      'The Interview was successfully restored.'
    )

    engagementPage.restoreCancelledInterviewButton.should('not.exist')
  })
})
