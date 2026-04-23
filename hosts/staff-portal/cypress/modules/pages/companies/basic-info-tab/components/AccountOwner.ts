import { EditableField } from '~integration/modules/components'

const fieldName = 'accountOwnerId'

class AccountOwner {
  editableField = new EditableField()

  toggleAccountOwner() {
    this.editableField.toggleEditMode(fieldName)
  }

  selectAccountOwnerValue(value: string) {
    // TODO: remove this after https://toptal-core.atlassian.net/browse/SPB-2789 is finished
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500)

    this.editableField.selectDropdownValue({
      key: fieldName,
      value
    })
  }

  getAccountOwner() {
    return this.editableField.get(fieldName)
  }
}

export default AccountOwner
