import { EditableField } from '~integration/modules/components'

const fieldName = 'claimerCategory'

class ClaimerCategory {
  editableField = new EditableField()

  toggleClaimerCategory() {
    this.editableField.toggleEditMode(fieldName)
  }

  selectClaimerCategory(value: string) {
    this.editableField.selectDropdownValue({ key: fieldName, value })
  }

  getClaimerCategory() {
    return this.editableField.get(fieldName)
  }
}

export default ClaimerCategory
