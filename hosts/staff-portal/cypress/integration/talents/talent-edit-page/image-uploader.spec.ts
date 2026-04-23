import { TalentEditPage } from '~integration/modules/pages'
import { updateTalentEditPageStubs } from '~integration/mocks/schema-updates/talents'
import { FormModal } from '~integration/modules/modals'

describe('Talent Edit Page > Image Uploader', () => {
  const page = new TalentEditPage()
  const formModal = new FormModal()

  it('uploads new image and saves it', () => {
    updateTalentEditPageStubs()

    page.visit()

    page.editAvatarButton.click()

    page.fileInput.attachFile('cypress-logo.jpg')

    formModal.submit()

    cy.getNotification().should(
      'have.text',
      'The profile photo was successfully updated.'
    )
  })
})
