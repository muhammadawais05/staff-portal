import { EditableField } from '~integration/modules/components'

const fieldName = 'accountManagerId'

class AccountManager {
  editableField = new EditableField()

  toggleAccountManager() {
    this.editableField.toggleEditMode(fieldName)
  }

  selectAccountManagerValue(value: string) {
    this.editableField.selectDropdownValue({
      key: fieldName,
      value
    })
  }

  getAccountManager() {
    return this.editableField.get(fieldName)
  }
}

export default AccountManager
