import StaffProfilePage from '~integration/modules/pages/staff-profile'
import { updateStaffProfileSendEmailStubs } from '~integration/mocks/schema-updates/staff-profile'
import { SendEmailModal } from '~integration/modules/modals'
import { ENTER_KEY } from '~integration/utils'

describe('Send Email Action', () => {
  const staffProfilePage = new StaffProfilePage()
  const actions = staffProfilePage.actions
  const sendEmailModal = new SendEmailModal()

  beforeEach(() => {
    updateStaffProfileSendEmailStubs()

    staffProfilePage.visit()
  })

  it('shows send email modal', () => {
    staffProfilePage.moreDropdown.click()
    actions.sendEmailMenuOption.click()

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
