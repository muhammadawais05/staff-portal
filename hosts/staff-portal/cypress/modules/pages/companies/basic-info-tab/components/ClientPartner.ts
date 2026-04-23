import { EditableField } from '~integration/modules/components'

const fieldName = 'clientPartnerId'

class ClientPartner {
  editableField = new EditableField()

  enterEditMode() {
    this.editableField.toggleEditMode(fieldName)
  }

  selectClientPartnerValue(value: string) {
    this.editableField.selectDropdownValue({
      key: fieldName,
      value
    })
  }

  getClientPartner() {
    return this.editableField.get(fieldName)
  }
}

export default ClientPartner
