export default class TalentHeaderActions {
  get passPrescreening() {
    return cy.getByTestId('pass-prescreening-button')
  }

  get resumeTalent() {
    return cy.getByTestId('resume-talent-button')
  }

  get restoreApplication() {
    return cy.getByTestId('restore-application-button')
  }

  get resumeApplication() {
    return cy.getByTestId('resume-application-button')
  }

  get rejectApplication() {
    return cy.getByTestId('reject-application-button')
  }

  get restoreOnboarding() {
    return cy.getByTestId('restore-onboarding-button')
  }
}
