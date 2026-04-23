import { updatePassPrescreeningStubs } from '~integration/mocks/schema-updates/talents'
import TalentProfilePage from '~integration/modules/pages/talents/talent-profile-tab'
import { FormModal } from '~integration/modules/modals'

describe('Talent Profile > Pass Prescreening', () => {
  const page = new TalentProfilePage()

  const modal = new FormModal()

  it('submits the modal', () => {
    updatePassPrescreeningStubs()
    page.visit()

    page.headerActions.passPrescreening.click()

    modal.comment.type('c')
    modal.submit()

    cy.getNotification().should(
      'have.text',
      'The applicant successfully passed their prescreening.'
    )
  })
})
