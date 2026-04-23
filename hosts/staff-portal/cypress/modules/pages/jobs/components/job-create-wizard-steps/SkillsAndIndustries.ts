export default class SkillsAndIndustriesStep {
  get addSkills() {
    return cy.getByTestId('other-skills-autocomplete')
  }

  get industries() {
    return cy.get('[name=industries]')
  }

  get submitButton() {
    return cy.get('button[type="submit"]')
  }
}
