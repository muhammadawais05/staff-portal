class TalentPerformanceCoachingSection {
  get item() {
    return cy.getByTestId('talent-coaching-list-item')
  }

  get addNoteButton() {
    return this.item.getByTestId('addNoteButton')
  }

  get addCoachingNoteButton() {
    return this.item.getByTestId('add-coaching-engagement-note-button')
  }

  get addTaskButton() {
    return this.item.getByTestId('add-task-button')
  }

  get cancelNoteCreationButton() {
    return this.item.get('button').contains('Cancel')
  }
}

export default TalentPerformanceCoachingSection
