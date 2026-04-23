import {
  DetailedListItem,
  EditableField
} from '~integration/modules/components'

const NAME = 'Status'
const LABEL = 'reason'

class StatusField extends DetailedListItem {
  editableField = new EditableField()

  toggleRejectionReason() {
    return this.editableField.toggleEditMode(LABEL)
  }

  selectReason(value: string) {
    return this.editableField.selectDropdownValue({ key: LABEL, value })
  }

  get editableFieldValue() {
    return this.editableField.get(LABEL)
  }

  get value() {
    return this.getItemValue(NAME)
  }
}

export default StatusField
