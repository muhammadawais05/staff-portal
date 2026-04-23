export default class BasicInfoStep {
  get jobType() {
    return cy.get('#verticalId')
  }

  get jobTitle() {
    return cy.get('input[name=title]')
  }

  get jobDescription() {
    return cy.get('textarea[name=description]')
  }

  get nextStepButton() {
    return cy.get('button[type="submit"]')
  }
}
