import { Talent, TalentCumulativeStatus } from '@staff-portal/graphql/staff'

import { TalentApplicantsPage } from '~integration/modules/pages'
import { FormModal } from '~integration/modules/modals'
import { updatePauseTalentApplicationStubsForTalentApplicantsPage } from '~integration/mocks/schema-updates/talents'

describe('Talent Applicants > Pause Application', () => {
  const page = new TalentApplicantsPage()

  const modal = new FormModal()

  it('opens the modal from the header button', () => {
    updatePauseTalentApplicationStubsForTalentApplicantsPage({
      talentCumulativeStatus: TalentCumulativeStatus.APPLIED,
      cumulativeStatus: TalentCumulativeStatus.APPLIED
    } as unknown as Talent)

    page.visit()

    page.pauseButton.click()

    modal.comment.focus().type('a')

    updatePauseTalentApplicationStubsForTalentApplicantsPage({
      talentCumulativeStatus: TalentCumulativeStatus.PAUSED,
      cumulativeStatus: TalentCumulativeStatus.PAUSED
    } as unknown as Talent)

    modal.submit()

    cy.getNotification().should('have.text', 'Application has been paused.')
  })
})
