import { EditableField } from '~integration/modules/components'

const fieldName = 'businessType'

class BusinessType {
  editableField = new EditableField()

  toggleBusinessType() {
    this.editableField.toggleEditMode(fieldName)
  }

  selectBusinessType(value: string) {
    this.editableField.selectDropdownValue({
      key: fieldName,
      value
    })
  }

  getBusinessType() {
    return this.editableField.get(fieldName)
  }
}

export default BusinessType
