import { JobPage } from '~integration/modules/pages/jobs'
import { jobMock } from '~integration/mocks'
import { successMutationMock } from '~integration/mocks/mutations'
import { FormModal } from '~integration/modules/modals'

describe('Unlink Job Opportunity', () => {
  const page = new JobPage()
  const confirmationModal = new FormModal()

  describe('when the form information is correct', () => {
    it('submits the modal and displays the success notification message', () => {
      cy.updateStaffMocks({
        Query: {
          node: () => jobMock()
        },
        Mutation: {
          unlinkJobOpportunity: successMutationMock
        }
      })

      page.visit()

      page.opportunityLink.should('have.text', 'Senior Designer')

      page.moreButton().click()
      page.moreDropdown.contains('Unlink Opportunity').click()

      confirmationModal.comment.type('Some comment')

      cy.updateStaffMocks({
        Query: {
          node: () => ({
            ...jobMock({
              opportunity: null
            })
          })
        },
        Mutation: {
          unlinkJobOpportunity: successMutationMock
        }
      })

      confirmationModal.submitButton.click()

      cy.getNotification().should(
        'have.text',
        'The opportunity was successfully unlinked.'
      )

      page.opportunityLink.should('not.exist')
    })
  })
})
