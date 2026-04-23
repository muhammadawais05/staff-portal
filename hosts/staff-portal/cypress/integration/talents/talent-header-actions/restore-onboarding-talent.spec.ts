import { Talent, TalentCumulativeStatus } from '@staff-portal/graphql/staff'

import { updateRestoreOnboardingTalentStubs } from '~integration/mocks/schema-updates/talents'
import TalentProfilePage from '~integration/modules/pages/talents/talent-profile-tab'
import { FormModal } from '~integration/modules/modals'

describe('Talent Header Actions > Restore Onboarding', () => {
  const page = new TalentProfilePage()

  const modal = new FormModal()

  it('restores the onboarding talent', () => {
    updateRestoreOnboardingTalentStubs({
      talentCumulativeStatus: TalentCumulativeStatus.REJECTED,
      cumulativeStatus: TalentCumulativeStatus.REJECTED
    } as unknown as Talent)
    page.visit()

    page.generalSection.statusField.value.should('have.text', 'Rejected')

    page.headerActions.restoreOnboarding.click()

    modal.comment.type('a')

    updateRestoreOnboardingTalentStubs({
      talentCumulativeStatus: TalentCumulativeStatus.IN_ONBOARDING,
      cumulativeStatus: TalentCumulativeStatus.IN_ONBOARDING
    } as unknown as Talent)

    modal.submit()

    cy.getNotification().should(
      'have.text',
      'Application has been restored. The talent was notified about the missing application details.'
    )

    modal.close()

    page.generalSection.statusField.value.should('have.text', 'In Onboarding')
  })
})
