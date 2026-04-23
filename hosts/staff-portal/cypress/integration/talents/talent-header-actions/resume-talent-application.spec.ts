import { Talent, TalentCumulativeStatus } from '@staff-portal/graphql/staff'

import { updateResumeTalentApplicationStubs } from '~integration/mocks/schema-updates/talents'
import TalentProfilePage from '~integration/modules/pages/talents/talent-profile-tab'
import { FormModal } from '~integration/modules/modals'

describe('Talent Header Actions > Resume Application', () => {
  const page = new TalentProfilePage()

  const modal = new FormModal()

  describe('when `applicationManualRestorationAvailable` is false', () => {
    it('resumes the talent application', () => {
      updateResumeTalentApplicationStubs({
        applicationManualRestorationAvailable: false,
        talent: {
          talentCumulativeStatus: TalentCumulativeStatus.REJECTED,
          cumulativeStatus: TalentCumulativeStatus.REJECTED
        } as unknown as Talent
      })
      page.visit()
      page.generalSection.statusField.value.should('have.text', 'Rejected')
      page.headerActions.resumeApplication.click()
      modal.comment.type('a')
      updateResumeTalentApplicationStubs({
        applicationManualRestorationAvailable: true,
        talent: {
          talentCumulativeStatus: TalentCumulativeStatus.APPLIED,
          cumulativeStatus: TalentCumulativeStatus.APPLIED
        } as unknown as Talent
      })
      modal.submit()

      cy.getNotification().should('have.text', 'Application has been restored.')

      page.generalSection.statusField.value.should('have.text', 'Applied')
    })
  })

  describe('when `applicationManualRestorationAvailable` is true', () => {
    it('resumes the talent application and send the interview invitation', () => {
      updateResumeTalentApplicationStubs({
        applicationManualRestorationAvailable: true,
        talent: {
          talentCumulativeStatus: TalentCumulativeStatus.REJECTED,
          cumulativeStatus: TalentCumulativeStatus.REJECTED
        } as unknown as Talent
      })
      page.visit()
      page.generalSection.statusField.value.should('have.text', 'Rejected')
      page.headerActions.resumeApplication.click()
      modal.comment.type('a')
      updateResumeTalentApplicationStubs({
        applicationManualRestorationAvailable: true,
        talent: {
          talentCumulativeStatus: TalentCumulativeStatus.APPLIED,
          cumulativeStatus: TalentCumulativeStatus.APPLIED
        } as unknown as Talent
      })
      modal.submit()

      cy.getNotification().should(
        'have.text',
        'Application has been restored. The talent received an invitation to schedule an interview.'
      )

      page.generalSection.statusField.value.should('have.text', 'Applied')
    })
  })
})
