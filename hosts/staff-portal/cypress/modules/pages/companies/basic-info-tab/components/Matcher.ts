import { EditableField } from '~integration/modules/components'

const fieldName = 'matcherId'

class Matcher {
  editableField = new EditableField()

  toggleMatcher() {
    this.editableField.toggleEditMode(fieldName)
  }

  selectMatcher(value: string) {
    this.editableField.selectDropdownValue({
      key: fieldName,
      value
    })
  }

  getMatcher() {
    return this.editableField.get(fieldName)
  }
}

export default Matcher
