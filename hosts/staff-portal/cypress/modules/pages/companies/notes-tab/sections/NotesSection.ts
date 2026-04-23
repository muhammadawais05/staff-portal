class NotesSection {
  getNote(id: string) {
    return cy.getByTestId(`NoteItem-${id}`)
  }

  getActivity(id: string) {
    return cy.getByTestId(`ActivityNoteItem-${id}`)
  }
}

export default NotesSection
