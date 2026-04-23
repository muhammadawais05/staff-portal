class RelatedTasksSection {
  get section() {
    return cy.getByTestId('RelatedTasks')
  }

  get addNewTask() {
    return this.section.findByTestId('add-new-task-button')
  }
}

export default RelatedTasksSection
