import { updateApplyToDifferentVerticalStubs } from '~integration/mocks/schema-updates/talents'
import { ApplyToDifferentVerticalModal } from '~integration/modules/pages/talents/components'
import TalentProfilePage from '~integration/modules/pages/talents/talent-profile-tab'
import { ENTER_KEY } from '~integration/utils'

describe('Talent Profile > More Actions > Apply to different vertical', () => {
  const page = new TalentProfilePage()
  const actions = page.moreActions

  const modal = new ApplyToDifferentVerticalModal()

  it('applies talent to a different vertical', () => {
    updateApplyToDifferentVerticalStubs()

    page.visit()

    page.moreActionsButton.click()

    actions.applyToDifferentVertical.click()

    modal.newVerticalSelect.click().trigger('keydown', { keyCode: ENTER_KEY })
    modal.skillsAutocomplete
      .click()
      .type('a')
      .trigger('keydown', { keyCode: ENTER_KEY })

    modal.submit()

    cy.getNotification().should(
      'have.text',
      'A new Designer role has been created for Euna Conroy.'
    )
  })
})
