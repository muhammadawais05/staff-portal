import { updateDeleteOpportunityMocks } from '~integration/mocks/schema-updates/opportunity'
import { FormModal } from '~integration/modules/modals'
import { OpportunityPage } from '~integration/modules/pages/opportunities'

describe('Opportunity profile -> More -> Delete', () => {
  const page = new OpportunityPage()
  const modal = new FormModal()

  it('submits the form and displays the success notification', () => {
    updateDeleteOpportunityMocks()

    page.visit()

    page.moreDropdown.click().contains('Delete').click()

    modal.comment.type('Test Comment')

    // TODO: The following code can be uncommented once the opportunities list page is migrated to Staff Portal

    // modal.submitButton.click()

    // cy.getNotification()
    //   .should('have.text', 'The Opportunity was successfully deleted.')
  })
})
