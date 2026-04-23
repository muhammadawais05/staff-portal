import { updateConvertTalentStubs } from '~integration/mocks/schema-updates/talents'
import TalentProfilePage from '~integration/modules/pages/talents/talent-profile-tab'
import { ConvertToAnotherVerticalModal } from '~integration/modules/pages/talents/talent-profile-tab/components'
import { ENTER_KEY } from '~integration/utils'

describe('Talent Profile > More Actions > Convert To...', () => {
  const page = new TalentProfilePage()
  const actions = page.moreActions

  const modal = new ConvertToAnotherVerticalModal()

  beforeEach(() => {
    updateConvertTalentStubs({
      type: 'Developer',
      talentType: 'developer',
      roleTitle: 'Developer'
    })

    page.visit()
  })

  it('converts the onboarding talent', () => {
    page.generalSection.profileType.should('have.text', 'Developer')
    page.generalSection.availability.should('contain.text', 'Developer')

    page.moreActionsButton.click()

    actions.convertOnboardingTalent.click()

    modal.onboardingVerticalField
      .click()
      .trigger('keydown', { keyCode: ENTER_KEY })

    updateConvertTalentStubs({
      type: 'Designer',
      talentType: 'designer',
      roleTitle: 'Designer'
    })

    modal.submit()

    cy.getNotification().should(
      'have.text',
      'The Developer was successfully converted to a Designer.'
    )

    page.generalSection.profileType.should('have.text', 'Designer')
    page.generalSection.availability.should('contain.text', 'Designer')
  })

  it('converts the talent', () => {
    page.generalSection.profileType.should('have.text', 'Developer')
    page.generalSection.availability.should('contain.text', 'Developer')

    page.moreActionsButton.click()

    actions.convertTalent.click()

    modal.verticalField.click().trigger('keydown', { keyCode: ENTER_KEY })
    modal.comment.type('a')

    updateConvertTalentStubs({
      type: 'Designer',
      talentType: 'designer',
      roleTitle: 'Designer'
    })

    modal.submit()

    cy.getNotification().should(
      'have.text',
      'The Developer was successfully converted to a Designer.'
    )

    page.generalSection.profileType.should('have.text', 'Designer')
    page.generalSection.availability.should('contain.text', 'Designer')
  })
})
