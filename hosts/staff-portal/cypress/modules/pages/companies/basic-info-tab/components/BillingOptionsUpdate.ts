import { EditableField } from '~integration/modules/components'

const fieldName = 'billingOptionsUpdateEnabled'

class BillingOptionsUpdate {
  editableField = new EditableField()

  toggleBillingOptionsUpdate() {
    this.editableField.toggleEditMode(fieldName)
  }

  selectBillingOptionsUpdate(value: string) {
    this.editableField.selectDropdownValue({
      key: fieldName,
      value
    })
  }

  getBillingOptionsUpdate() {
    return this.editableField.get(fieldName)
  }
}

export default BillingOptionsUpdate
