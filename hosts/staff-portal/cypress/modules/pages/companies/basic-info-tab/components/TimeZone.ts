import { EditableField } from '~integration/modules/components'

const fieldName = 'timeZoneName'

class TimeZone {
  editableField = new EditableField()

  toggleTimeZone() {
    return this.editableField.toggleEditMode(fieldName)
  }

  selectTimeZone(value: string) {
    return this.editableField.selectDropdownValue({
      key: fieldName,
      value
    })
  }

  getTimeZone() {
    return this.editableField.get(fieldName)
  }
}

export default TimeZone
