import { EditableField } from '~integration/modules/components'

const fieldName = 'actualSignDate'

class ActualSignDate {
  editableField = new EditableField()

  toggleActualSignDate() {
    this.editableField.toggleEditMode(fieldName)
  }

  clearInputValue() {
    return this.editableField.getInput(fieldName).clear()
  }

  selectActualSignDate(value: string) {
    this.clearInputValue()
    this.editableField.updateInput({ key: fieldName, value }).save()
  }

  resetActualSignDate() {
    this.clearInputValue().type('{enter}')
  }

  getActualSignDate() {
    return this.editableField.get(fieldName)
  }
}

export default ActualSignDate
