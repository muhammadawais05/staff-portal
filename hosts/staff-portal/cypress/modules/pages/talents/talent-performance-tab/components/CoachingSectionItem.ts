import { EditableField } from '~integration/modules/components'

const coachIdFieldName = 'coachId'
const statusFieldName = 'status'

export default class CoachingSectionItem {
  editableField = new EditableField()

  get coachIdField() {
    return this.editableField.get(coachIdFieldName)
  }

  toggleCoachIdEdit() {
    this.editableField.toggleEditMode(coachIdFieldName)
  }

  selectCoachId(value: string) {
    this.editableField.selectDropdownValue({
      key: coachIdFieldName,
      value
    })
  }

  get statusField() {
    return this.editableField.get(statusFieldName)
  }

  toggleStatusEdit() {
    this.editableField.toggleEditMode(statusFieldName)
  }

  selectStatus(value: string) {
    this.editableField.selectDropdownValue({
      key: statusFieldName,
      value
    })
  }
}
