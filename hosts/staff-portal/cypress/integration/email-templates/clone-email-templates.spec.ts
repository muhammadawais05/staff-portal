import { EmailTemplatesPage } from '~integration/modules/pages'
import { updateCloneEmailTemplatesStubsForEmailTemplatesPage } from '~integration/mocks/schema-updates/email-templates'
import { FormModal } from '~integration/modules/modals'

describe('Email Templates > Clone Email Templates', () => {
  const page = new EmailTemplatesPage()
  const modal = new FormModal()

  it('open the modal from the header actions', () => {
    updateCloneEmailTemplatesStubsForEmailTemplatesPage()

    page.visit()

    page.cloneEmailTemplatesButton.click()

    modal.setDropdown('originalTargetRole', 'Developer')
    modal.setDropdown('destinationTargetRole', 'Developer')

    modal.submit()

    cy.getNotification().should(
      'have.text',
      'The email templates were successfully cloned.'
    )
  })
})
