class TaskListSection {
  get section() {
    return cy.getByTestId('grouped-tasks-table')
  }

  get items() {
    return this.section.findByTestId('task-row')
  }

  get firstItem() {
    return this.items.first()
  }

  get firstItemExpandableButton() {
    return this.firstItem.findByTestId('task-list-item-expand-button')
  }

  get firstItemCompleteTaskCheckbox() {
    return this.firstItem.findByTestId('complete-task').find('input')
  }
}

export default TaskListSection
