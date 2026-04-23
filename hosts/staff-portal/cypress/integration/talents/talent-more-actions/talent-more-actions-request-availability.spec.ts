import { DEBOUNCED_AUTOCOMPLETE, ENTER_KEY } from '~integration/utils'
import { updateTalentMoreActionsRequestAvailabilityStubs } from '~integration/mocks/schema-updates/talents'
import TalentProfilePage from '~integration/modules/pages/talents/talent-profile-tab'
import { RequestAvailabilityModal } from '~integration/modules/pages/talents/components'

describe('Talent More Actions > Request Availability', () => {
  const page = new TalentProfilePage()
  const actions = page.moreActions

  it('requests availability for a talent', () => {
    const modal = new RequestAvailabilityModal()

    updateTalentMoreActionsRequestAvailabilityStubs()

    cy.clock()
    page.visitWithJob()

    page.moreActionsButton.click()

    actions.requestAvailabilityMenuOption.click()
    modal.clientAutocompleteField
      .click()
      .type('We')
      .tick(DEBOUNCED_AUTOCOMPLETE)

    modal.clientAutocompleteField.trigger('keydown', {
      keyCode: ENTER_KEY
    })

    modal.setDropdown('jobId', 'Skill tester')

    modal.selectJobField.trigger('keydown', {
      keyCode: ENTER_KEY
    })

    modal.comment.type('a')

    modal.submit()

    cy.getNotification().should(
      'contain',
      'The Availability Request was successfully created.'
    )
  })
})
