import { Talent, TalentCumulativeStatus } from '@staff-portal/graphql/staff'

import { TalentApplicantsPage } from '~integration/modules/pages'
import { FormModal } from '~integration/modules/modals'
import { updateRestoreTalentApplicationStubsForTalentApplicantsPage } from '~integration/mocks/schema-updates/talents'

describe('Talent Applicants > Restore Application', () => {
  const page = new TalentApplicantsPage()

  const modal = new FormModal()

  it('opens the modal from the header button', () => {
    updateRestoreTalentApplicationStubsForTalentApplicantsPage({
      talentCumulativeStatus: TalentCumulativeStatus.REJECTED,
      cumulativeStatus: TalentCumulativeStatus.REJECTED
    } as unknown as Talent)

    page.visit()

    page.restoreButton.click()

    modal.comment.type('a')

    updateRestoreTalentApplicationStubsForTalentApplicantsPage({
      talentCumulativeStatus: TalentCumulativeStatus.APPLIED,
      cumulativeStatus: TalentCumulativeStatus.APPLIED
    } as unknown as Talent)

    modal.submit()

    cy.getNotification().should('have.text', 'Application has been restored.')
  })
})
