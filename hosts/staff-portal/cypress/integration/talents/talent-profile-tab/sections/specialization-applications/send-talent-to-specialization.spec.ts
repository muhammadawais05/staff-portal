import updateTalentSpecializationApplicationsStubs from '~integration/mocks/schema-updates/talents/talent-specialization-applicants-section-stubs-update'
import talentSpecializationApplicationsMock from '~integration/mocks/talent-specialization-applications-mock'
import TalentProfilePage from '~integration/modules/pages/talents/talent-profile-tab'

const SPECIALIZATION = 'Developer'

describe('Talent Profile > Specialization Applications Section', () => {
  const page = new TalentProfilePage()
  const { specializationApplicationsSection: section } = page

  it('Begin Specialization Application', () => {
    updateTalentSpecializationApplicationsStubs(
      talentSpecializationApplicationsMock({
        availableSpecialization: { title: SPECIALIZATION }
      })
    )
    page.visit()

    section.sendTalentToSpecializationButton.click()
    section.sendTalentToSpecializationModal.selectSpecialization(SPECIALIZATION)
    section.sendTalentToSpecializationModal.comment.type('C')
    section.sendTalentToSpecializationModal.submitButton.click()
    cy.getNotification().should(
      'have.text',
      `Application for ${SPECIALIZATION} specialization has been added.`
    )
  })
})
