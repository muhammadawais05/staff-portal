class AddNewTaskModal {
  get descriptionField() {
    return cy.getByTestId('add-new-task-modal-description')
  }

  get dueDateField() {
    return cy.getByTestId('add-new-task-modal-due-date').find('input')
  }

  get submitButton() {
    return cy.getByTestId('create-task-button')
  }
}

export default AddNewTaskModal
