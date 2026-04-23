class NotesSection {
  getNote(id: string) {
    return cy.getByTestId(`NoteItem-${id}`)
  }

  get addMatchingNoteButton() {
    return cy.getByTestId('add-matching-note-button')
  }

  get editForm() {
    return cy.getByTestId('NotesSection').find('form')
  }

  getDeleteButton(id: string) {
    return this.getNote(id).get('[aria-label="Delete Note"]')
  }

  getEditButton(id: string) {
    return this.getNote(id).get('[aria-label="Edit Note"]')
  }
}

export default NotesSection
