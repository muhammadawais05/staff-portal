import { EmailMessagesPage } from '../../modules/pages'
import {
  updateEmailMessageListStubs,
  updateEmailMessageSendEmailStubs
} from '~integration/mocks/schema-updates/email-messages'
import { SendEmailModal } from '~integration/modules/modals'

describe('Email Messages Page', () => {
  const page = new EmailMessagesPage()

  describe('No messages', () => {
    it('renders empty message', () => {
      updateEmailMessageListStubs()

      page.visit()

      page.emptyMessage
        .should('exist')
        .should('contain', 'There are no messages for this search criteria')
    })
  })

  describe('Send Email', () => {
    it('opens the send email modal', () => {
      const sendEmailModal = new SendEmailModal()

      updateEmailMessageSendEmailStubs()

      page.visitFromTalent()
      page.sendEmailButton.click()

      sendEmailModal.subjectField.type('S')
      sendEmailModal.submitButton.click()

      cy.getNotification().should('contain', 'The email was successfully sent.')
    })
  })
})
