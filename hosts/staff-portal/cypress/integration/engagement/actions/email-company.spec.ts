import { updateEmailCompanyMocks } from '~integration/mocks/schema-updates/engagement'
import { Engagement } from '~integration/modules/pages/engagements'
import { SendEmailModal } from '~integration/modules/modals'
import { ENTER_KEY } from '~integration/utils'

describe('Engagement page -> More -> Email company', () => {
  const page = new Engagement()
  const sendEmailModal = new SendEmailModal()

  describe('when the form information is correct', () => {
    it('submits `Email Company` modal', () => {
      updateEmailCompanyMocks()

      page.visit()

      page.moreButton().click()
      page.moreDropdown.contains('Email Company').click()

      sendEmailModal.emailTemplateField
        .click()
        .trigger('keydown', { keyCode: ENTER_KEY })

      sendEmailModal.submitButton.click()

      cy.getNotification().should(
        'have.text',
        'The email was successfully sent.'
      )
    })
  })
})
