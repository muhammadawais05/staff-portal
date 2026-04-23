import {
  DetailedListItem,
  EditableTextArea
} from '~integration/modules/components'

const LABEL = 'billingNotes'

class NotesField extends DetailedListItem {
  editableTextArea = new EditableTextArea()

  toggleNotesEditMode() {
    return this.editableTextArea.toggleEditMode(LABEL)
  }

  updateNotesValue(value: string) {
    return this.editableTextArea.updateTextArea({ key: LABEL, value })
  }

  get value() {
    return this.editableTextArea.get(LABEL)
  }
}

export default NotesField
