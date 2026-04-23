import BasePage from './BasePage'

class SkillsPage extends BasePage {
  visit() {
    return cy.visit('/skills')
  }

  getEmptyMessage() {
    return cy.getByTestId('no-search-results')
  }

  getSkillNamesListTable() {
    return cy.getByTestId('SkillNamesTable-list')
  }

  getPageTitle() {
    return cy.get('h2')
  }

  requestRemovePrompt() {
    return cy.getByTestId('DeleteSkillNameButton').click()
  }

  requestClonePrompt() {
    return cy.getByTestId('CloneSkillNameButton').click()
  }

  requestEditModal() {
    return cy.getByTestId('EditSkillNameButton').click()
  }

  getDeleteButton() {
    return this.getModal().find('button').contains('Delete Skill')
  }

  getCloneButton() {
    return this.getModal().find('button').contains('Clone Skill')
  }

  geEditButton() {
    return this.getModal().find('button').contains('Save Skill')
  }

  getModal() {
    return cy.get('.MuiDialog-container')
  }
}

export default SkillsPage
