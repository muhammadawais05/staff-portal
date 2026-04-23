import { Talent, TalentCumulativeStatus } from '@staff-portal/graphql/staff'

import { updateResumeTalentStubs } from '~integration/mocks/schema-updates/talents'
import TalentProfilePage from '~integration/modules/pages/talents/talent-profile-tab'
import { FormModal } from '~integration/modules/modals'

describe('Talent Profile > Resume Talent', () => {
  const page = new TalentProfilePage()

  const modal = new FormModal()

  it('submits the modal', () => {
    updateResumeTalentStubs({
      talentCumulativeStatus: TalentCumulativeStatus.REJECTED,
      cumulativeStatus: TalentCumulativeStatus.REJECTED
    } as unknown as Talent)
    page.visit()

    page.headerActions.resumeTalent.click()

    modal.comment.type('c')

    updateResumeTalentStubs({
      talentCumulativeStatus: TalentCumulativeStatus.ACTIVE,
      cumulativeStatus: TalentCumulativeStatus.ACTIVE
    } as unknown as Talent)

    modal.submit()

    cy.getNotification().should('have.text', 'Application has been resumed.')

    page.generalSection.statusField.value.should('have.text', 'Active')
  })
})
