import { EmailMessagesPage } from '../../../modules/pages'
import {
  updateEmailMessageAssociateUserStubs,
  updateEmailMessageBlacklistEmailStubs
} from '~integration/mocks/schema-updates/email-messages'
import { DEBOUNCED_AUTOCOMPLETE, ENTER_KEY } from '~integration/utils'
import {
  emailMessageMock,
  userEmailMessageMock
} from '~integration/mocks/fragments'
import {
  AssociateUserModal,
  BlacklistEmailModal,
  EmailMessageItem
} from '~integration/modules/pages/email-messages/components'

describe('Email Messages Page -', () => {
  const page = new EmailMessagesPage()
  const emailMessageItem = new EmailMessageItem()

  const fromEmail = {
    blacklisted: false,
    email: 'from@toptal.io'
  }

  const toEmail = {
    blacklisted: false,
    email: 'to@toptal.io'
  }

  describe('Associate User', () => {
    it('opens the modal and associate a user', () => {
      const emailMessage = emailMessageMock({ from: fromEmail, to: [toEmail] })
      const userMock = userEmailMessageMock({ email: toEmail.email })
      const associateModal = new AssociateUserModal()

      updateEmailMessageAssociateUserStubs({
        emailMessage,
        users: [null, userMock]
      })

      cy.clock()
      page.visit()

      page.emailMessageItem.within(() => {
        emailMessageItem.unknownEmail.click()
      })

      emailMessageItem.associateUserButton.click()

      associateModal.userAutocompleteField
        .click()
        .type('Ma')
        .tick(DEBOUNCED_AUTOCOMPLETE)
      associateModal.userAutocompleteField.trigger('keydown', {
        keyCode: ENTER_KEY
      })

      associateModal.selectButton.click()

      cy.getNotification().should('contain', 'Email was associated.')
    })
  })

  describe('Blacklist User', () => {
    it('opens the modal and blacklist an email', () => {
      const emailMessage = emailMessageMock({ from: fromEmail, to: [toEmail] })
      const userMock = userEmailMessageMock({ email: toEmail.email })
      const blacklistEmailModal = new BlacklistEmailModal()

      updateEmailMessageBlacklistEmailStubs({
        emailMessage,
        users: [null, userMock]
      })

      page.visit()

      page.emailMessageItem.within(() => {
        emailMessageItem.unknownEmail.click()
      })

      emailMessageItem.blacklistEmailButton.click()

      blacklistEmailModal.submitButton.click()

      cy.getNotification().should('contain', 'Email was blacklisted.')
    })
  })
})
