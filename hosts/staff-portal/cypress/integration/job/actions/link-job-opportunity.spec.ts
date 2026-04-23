import { JobPage } from '~integration/modules/pages/jobs'
import { jobMock } from '~integration/mocks'
import { successMutationMock } from '~integration/mocks/mutations'
import { ENTER_KEY } from '~integration/utils'
import { LinkJobOpportunity } from '~integration/modules/pages/jobs/components'

describe('Link Job Opportunity', () => {
  const page = new JobPage()
  const linkJobOpportunity = new LinkJobOpportunity()

  describe('when the form information is correct', () => {
    it('submits the modal and displays the success notification message', () => {
      cy.updateStaffMocks({
        Query: {
          node: () => ({
            ...jobMock()
          })
        },
        Mutation: {
          linkJobOpportunity: successMutationMock
        }
      })

      page.visit()

      page.moreButton().click()
      page.moreDropdown.contains('Link Opportunity').click()

      linkJobOpportunity.opportunitySelect
        .click()
        .trigger('keydown', { keyCode: ENTER_KEY, force: true })

      linkJobOpportunity.submitButton.click()

      cy.getNotification().should(
        'have.text',
        'The opportunity was successfully linked.'
      )
    })
  })
})
