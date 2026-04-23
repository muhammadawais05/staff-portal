class ActivityNote {
  get deleteButton() {
    return cy.get('[aria-label="Delete Activity"]')
  }

  get editButton() {
    return cy.get('[aria-label="Edit Activity"]')
  }
}

export default ActivityNote
