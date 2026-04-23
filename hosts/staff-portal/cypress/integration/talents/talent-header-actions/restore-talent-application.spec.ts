import { Talent, TalentCumulativeStatus } from '@staff-portal/graphql/staff'

import { updateRestoreTalentApplicationStubs } from '~integration/mocks/schema-updates/talents'
import TalentProfilePage from '~integration/modules/pages/talents/talent-profile-tab'
import { FormModal } from '~integration/modules/modals'

describe('Talent Header Actions > Restore Application', () => {
  const page = new TalentProfilePage()

  const modal = new FormModal()

  it('restores the talent application', () => {
    updateRestoreTalentApplicationStubs({
      talentCumulativeStatus: TalentCumulativeStatus.REJECTED,
      cumulativeStatus: TalentCumulativeStatus.REJECTED
    } as unknown as Talent)
    page.visit()

    page.generalSection.statusField.value.should('have.text', 'Rejected')

    page.headerActions.restoreApplication.click()

    modal.comment.type('a')

    updateRestoreTalentApplicationStubs({
      talentCumulativeStatus: TalentCumulativeStatus.APPLIED,
      cumulativeStatus: TalentCumulativeStatus.APPLIED
    } as unknown as Talent)

    modal.submit()

    cy.getNotification().should('have.text', 'Application has been restored.')

    page.generalSection.statusField.value.should('have.text', 'Applied')
  })
})
