import { updateEmailCompanyStubs } from '~integration/mocks/schema-updates/job'
import { SendEmailModal } from '~integration/modules/modals'
import { JobPage } from '~integration/modules/pages/jobs'
import { ENTER_KEY } from '~integration/utils'

describe('Job Page -> Email Company', () => {
  const page = new JobPage()
  const sendEmailModal = new SendEmailModal()

  describe('when the form information is correct', () => {
    it('submits the modal and displays the success notification message', () => {
      updateEmailCompanyStubs()

      page.visit()

      page.moreButton().click()
      page.moreDropdown.contains('Email Company').click()

      sendEmailModal.emailTemplateField
        .focus()
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
