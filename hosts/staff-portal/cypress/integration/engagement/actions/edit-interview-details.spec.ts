import { updateEditInterviewDetailsStubs } from '~integration/mocks/schema-updates/engagement'
import { Engagement } from '~integration/modules/pages/engagements'
import EditInterviewDetails from '~integration/modules/pages/engagements/components/EditInterviewDetails'

describe('Engagement profile -> More -> Edit Interview Details', () => {
  const page = new Engagement()
  const editInterviewDetails = new EditInterviewDetails()

  it('submits the form and displays the success notification', () => {
    updateEditInterviewDetailsStubs()

    page.visit()

    page.moreButton().click()
    page.moreDropdown.contains('Edit Interview Details').click()

    editInterviewDetails.getTitleField().type('C')
    editInterviewDetails.getDescriptionField().type('C')
    editInterviewDetails.getReceiversField().clear().type('asd@toptal.io')

    editInterviewDetails.submitButton.click()

    cy.getNotification().should(
      'have.text',
      'The Interview was successfully updated.'
    )
  })
})
