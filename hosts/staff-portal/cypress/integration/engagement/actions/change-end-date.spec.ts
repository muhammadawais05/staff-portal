import { updateChangeEndDateMocks } from '~integration/mocks/schema-updates/engagement'
import { Engagement } from '~integration/modules/pages/engagements'
import { ChangeEndDateModal } from '~integration/modules/pages/engagements/components'

describe('Engagement page -> More -> Change End Date', () => {
  const page = new Engagement()
  const changeEndDateModal = new ChangeEndDateModal()

  describe('when the form information is correct', () => {
    it('changes the end date and updates Status section', () => {
      updateChangeEndDateMocks()

      page.visit()

      page.moreButton().click()
      page.moreDropdown.contains('Change End Date').click()

      changeEndDateModal.getEndDateField()
      cy.getByTestId('day-button-20').click()
      changeEndDateModal.getReasonField().type('test')

      changeEndDateModal.submitButton.click()

      cy.getNotification().should(
        'have.text',
        'The End Date was successfully changed.'
      )
    })
  })
})
