import { Talent, TalentCumulativeStatus } from '@staff-portal/graphql/staff'

import { updatePauseTalentApplicationStubs } from '~integration/mocks/schema-updates/talents'
import TalentProfilePage from '~integration/modules/pages/talents/talent-profile-tab'
import { FormModal } from '~integration/modules/modals'

describe('Talent Profile > More Actions > Pause Application', () => {
  const page = new TalentProfilePage()
  const actions = page.moreActions

  const modal = new FormModal()

  it('pauses the talent application', () => {
    updatePauseTalentApplicationStubs({
      talentCumulativeStatus: TalentCumulativeStatus.APPLIED,
      cumulativeStatus: TalentCumulativeStatus.APPLIED
    } as unknown as Talent)

    page.visit()

    page.generalSection.statusField.value.should('have.text', 'Applied')

    page.moreActionsButton.click()
    actions.pauseApplication.click()

    modal.comment.focus().type('a')

    updatePauseTalentApplicationStubs({
      talentCumulativeStatus: TalentCumulativeStatus.PAUSED,
      cumulativeStatus: TalentCumulativeStatus.PAUSED
    } as unknown as Talent)

    modal.submit()

    cy.getNotification().should('have.text', 'Application has been paused.')

    page.generalSection.statusField.value.should('have.text', 'Paused')
  })
})
