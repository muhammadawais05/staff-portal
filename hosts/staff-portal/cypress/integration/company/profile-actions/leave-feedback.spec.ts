import { updateLeaveFeedbackStubs } from '~integration/mocks/schema-updates/companies'
import CompanyProfilePage, {
  LeaveFeedbackModal
} from '~integration/modules/pages/companies'

describe('Leave Feedback', () => {
  const page = new CompanyProfilePage()
  const leaveFeedbackModal = new LeaveFeedbackModal()

  beforeEach(() => {
    updateLeaveFeedbackStubs()
  })

  it('submits the form and leaves feedback', () => {
    page.basicInfoTab.visitTab()

    page.moreDropdown.click()
    page.moreDropdown.contains('Leave Feedback').click()

    leaveFeedbackModal.questionItemRadio.check('0')
    leaveFeedbackModal.negativeCheckbox.first().check()
    leaveFeedbackModal.commentsField.first().type('c')

    leaveFeedbackModal.submitButton.click()

    cy.getNotification().should(
      'have.text',
      'The Survey was successfully submitted.'
    )
  })
})
