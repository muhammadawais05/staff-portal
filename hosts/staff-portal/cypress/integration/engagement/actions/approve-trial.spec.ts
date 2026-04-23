import { Engagement } from '~integration/modules/pages/engagements'
import { updateApproveTrialStubs } from '~integration/mocks/schema-updates/engagement'
import { BasicModal } from '~integration/modules/modals'

describe('Engagement -> More -> Approve Trial', () => {
  const page = new Engagement()
  const modal = new BasicModal()

  it('Submits `Approve Trial` modal', () => {
    updateApproveTrialStubs()

    page.visit()

    page.moreButton().click()
    page.moreDropdown.contains('Approve Trial').click()

    modal.clickButton('Hire Developer')

    cy.getNotification().should(
      'have.text',
      'Developer was successfully hired.'
    )
  })
})
