class RelatedTasksSection {
  get tableRow() {
    return cy.getByTestId('task-row')
  }

  get expandRowButton() {
    return cy.getByTestId('task-list-item-expand-button')
  }

  get completedTasksVisibilityButton() {
    return cy.getByTestId('related-tasks-toggle-completed')
  }

  get addNewTaskButton() {
    return cy.getByTestId('add-new-task-button')
  }

  get expandedTaskCard() {
    return cy.getByTestId('task-cards-container')
  }
}

export default RelatedTasksSection
