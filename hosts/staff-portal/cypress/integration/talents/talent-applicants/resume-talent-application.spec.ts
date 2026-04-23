import { Talent, TalentCumulativeStatus } from '@staff-portal/graphql/staff'

import { TalentApplicantsPage } from '~integration/modules/pages'
import { FormModal } from '~integration/modules/modals'
import { updateResumeTalentApplicationStubsForTalentApplicantsPage } from '~integration/mocks/schema-updates/talents'

describe('Talent Applicants > Resume Application', () => {
  const page = new TalentApplicantsPage()

  const modal = new FormModal()

  it('resumes the talent application', () => {
    updateResumeTalentApplicationStubsForTalentApplicantsPage({
      applicationManualRestorationAvailable: false,
      talent: {
        talentCumulativeStatus: TalentCumulativeStatus.REJECTED,
        cumulativeStatus: TalentCumulativeStatus.REJECTED
      } as unknown as Talent
    })

    page.visit()

    page.resumeButton.click()
    modal.comment.type('a')

    updateResumeTalentApplicationStubsForTalentApplicantsPage({
      applicationManualRestorationAvailable: true,
      talent: {
        talentCumulativeStatus: TalentCumulativeStatus.APPLIED,
        cumulativeStatus: TalentCumulativeStatus.APPLIED
      } as unknown as Talent
    })

    modal.submit()

    cy.getNotification().should('have.text', 'Application has been resumed.')
  })
})
