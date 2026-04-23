import { BasePage } from '~integration/modules/pages'
import { TalentHeaderActions } from '~integration/modules/pages/talents/components'
import { RejectSpecializationApplicationModal } from './talents/talent-profile-tab/components'

class TalentApplicantsPage extends BasePage {
  headerActions = new TalentHeaderActions()
  rejectSpecializationModal = new RejectSpecializationApplicationModal()

  visit() {
    cy.visit('/applicants/talents')
  }

  get pauseButton() {
    return cy.getByTestId('pause-application-button-talent-applicants-page')
  }

  get restoreButton() {
    return cy.getByTestId('restore-application-button')
  }

  get resumeButton() {
    return cy.getByTestId('resume-talent-button')
  }
}

export default TalentApplicantsPage
