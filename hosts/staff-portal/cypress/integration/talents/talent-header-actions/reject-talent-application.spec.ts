import { updateRejectTalentApplicationStubs } from '~integration/mocks/schema-updates/talents'
import TalentProfilePage from '~integration/modules/pages/talents/talent-profile-tab'
import { FormModal } from '~integration/modules/modals'

describe('Talent Profile > Reject Application', () => {
  const page = new TalentProfilePage()
  const actions = page.moreActions

  const modal = new FormModal()

  it('opens the modal from the header button', () => {
    updateRejectTalentApplicationStubs()
    page.visit()

    page.headerActions.rejectApplication.click()

    modal.self.should('contain.text', 'Reject Application')
  })

  it('opens the modal from the more dropdown', () => {
    updateRejectTalentApplicationStubs()
    page.visit()

    page.moreActionsButton.click()
    actions.rejectApplication.click()

    modal.self.should('contain.text', 'Reject Application')
  })
})
