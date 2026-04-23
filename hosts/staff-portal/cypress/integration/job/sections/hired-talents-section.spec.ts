import { JobPage } from '~integration/modules/pages/jobs'
import { updateHiredTalentMocks } from '~integration/mocks/schema-updates/job'
import { ENTER_KEY } from '~integration/utils'

describe('Hired Talent Section', () => {
  const page = new JobPage()
  const { hiredTalentSection: section } = page

  // TODO: override the test with the usage of the new mocks
  // https://toptal-core.atlassian.net/browse/SPB-3259
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('renders Hired Talent section', () => {
    updateHiredTalentMocks()

    page.visit()

    section.getSection().should('contain', 'Trial Length')
    section.getTrialLengthEditButton().click()

    section.trialLengthEdit
      .getLengthSelector()
      .click()
      // TODO: remove { force: true } in scope of
      // https://toptal-core.atlassian.net/browse/SPB-2967
      .trigger('keydown', { keyCode: ENTER_KEY, force: true })

    section.trialLengthEdit.getTrialLengthEditComment().type('Some comment')
    section.trialLengthEdit.getTrialLengthEditSubmitButton().click()

    cy.getNotification().should(
      'have.text',
      'The Trial Length was successfully changed.'
    )
  })
})
