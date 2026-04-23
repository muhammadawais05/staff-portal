import updateTalentSpecializationApplicationsStubs from '~integration/mocks/schema-updates/talents/talent-specialization-applicants-section-stubs-update'
import talentSpecializationApplicationsMock from '~integration/mocks/talent-specialization-applications-mock'
import TalentProfilePage from '~integration/modules/pages/talents/talent-profile-tab'

const SPECIALIZATION = 'Developer'

describe('Talent Profile > Specialization Applications Section', () => {
  const page = new TalentProfilePage()
  const { specializationApplicationsSection: section } = page

  it('Add to Remote Consulting', () => {
    updateTalentSpecializationApplicationsStubs(
      talentSpecializationApplicationsMock({
        availableSpecialization: { title: SPECIALIZATION }
      })
    )
    page.visit()

    section.addTalentToRemoteConsultingButton.click()
    section.addTalentToRemoteConsultingModal.selectSpecialization(
      SPECIALIZATION
    )
    section.addTalentToRemoteConsultingModal.submitButton.click()
    cy.getNotification().should('have.text', `Added to Remote Consulting`)
  })
})
