import { Talent, TalentCumulativeStatus } from '@staff-portal/graphql/staff'

import { updateResetTalentApplicationStubs } from '~integration/mocks/schema-updates/talents'
import TalentProfilePage from '~integration/modules/pages/talents/talent-profile-tab'
import { FormModal } from '~integration/modules/modals'

describe('Talent Profile > More Actions > Reset Application', () => {
  const page = new TalentProfilePage()
  const actions = page.moreActions

  const modal = new FormModal()

  it('resets the talent application', () => {
    updateResetTalentApplicationStubs({
      talentCumulativeStatus: TalentCumulativeStatus.REJECTED,
      cumulativeStatus: TalentCumulativeStatus.REJECTED
    } as unknown as Talent)
    page.visit()

    page.moreActionsButton.click()
    actions.resetApplication.click()

    modal.comment.focus().type('a')

    updateResetTalentApplicationStubs({
      talentCumulativeStatus: TalentCumulativeStatus.IN_ONBOARDING,
      cumulativeStatus: TalentCumulativeStatus.IN_ONBOARDING
    } as unknown as Talent)

    modal.submit()

    cy.getNotification().should('have.text', 'Application has been reset.')

    // To close the email modal
    modal.close()

    page.generalSection.statusField.value.should('have.text', 'In Onboarding')
  })
})
