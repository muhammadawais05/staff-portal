import { Engagement } from '~integration/modules/pages/engagements'
import { updateChangeCommitmentMocks } from '~integration/mocks/schema-updates/engagement'

describe('Engagement -> More -> Change Commitment', () => {
  const page = new Engagement()

  describe('when the form information is correct', () => {
    it('submits the `Change Commitment` modal', () => {
      updateChangeCommitmentMocks()

      page.visit()

      page.moreButton().click()
      page.moreDropdown.contains('Change Commitment').click()
      cy.getByTestId('CommitmentChangeModalForm').submit()

      cy.getNotification().should(
        'have.text',
        'The Commitment was successfully changed.'
      )
    })
  })
})
