class NotesSectionActions {
  getShowActivitiesCheckbox() {
    return cy.getByTestId('NoteSectionAdditionalActions-show-activities')
  }

  get addActivityButton() {
    return cy.getByTestId('add-activity-button')
  }
}

export default NotesSectionActions
