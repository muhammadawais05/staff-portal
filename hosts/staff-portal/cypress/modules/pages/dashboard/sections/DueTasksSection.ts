class DueTasksSection {
  get section() {
    return cy.getByTestId('due-tasks')
  }

  get addNewTaskButton() {
    return this.section.findByTestId('add-new-task-button')
  }
}

export default DueTasksSection
