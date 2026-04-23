import { EmailTemplatesPage } from '~integration/modules/pages'
import { deleteCloneEmailTemplatesStubsForEmailTemplatesPage } from '~integration/mocks/schema-updates/email-templates'
import { FormModal } from '~integration/modules/modals'

describe('Email Templates > Delete Email Template', () => {
  const page = new EmailTemplatesPage()
  const modal = new FormModal()

  it('open the modal from the header actions', () => {
    deleteCloneEmailTemplatesStubsForEmailTemplatesPage()

    page.visit()

    page.deleteEmailTemplateButton.click()

    modal.submit()

    cy.getNotification().should(
      'have.text',
      'The Email Template was successfully deleted.'
    )
  })
})
