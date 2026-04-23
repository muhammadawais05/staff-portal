import { updateChangeStartDateMocks } from '~integration/mocks/schema-updates/engagement'
import { Engagement } from '~integration/modules/pages/engagements'
import { ChangeStartDateModal } from '~integration/modules/pages/engagements/components'
import { daysFromNow, ENTER_KEY } from '~integration/utils'

describe('Engagement page -> More -> Change Start Date', () => {
  const page = new Engagement()
  const changeStartDateModal = new ChangeStartDateModal()

  describe('when the form information is correct', () => {
    it('changes the start date and updates the Status section', () => {
      updateChangeStartDateMocks()

      page.visit()

      page.moreButton().click()
      page.moreDropdown.contains('Change Start Date').click()

      changeStartDateModal
        .getTimeZoneField()
        .should('have.value', 'Europe/London')
      changeStartDateModal
        .getStartDateField()
        .type(daysFromNow(7))
        .trigger('keydown', { keyCode: ENTER_KEY })
      changeStartDateModal
        .getReasonField()
        .click()
        .type('Some reason')
        .trigger('keydown', { keyCode: ENTER_KEY })

      changeStartDateModal.submitButton.click()

      cy.getNotification().should(
        'have.text',
        'The Start Date was successfully changed.'
      )
    })
  })
})
