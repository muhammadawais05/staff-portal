import { EditableField } from '~integration/modules/components'

const fieldName = 'enterpriseSalesExecutiveId'

class EnterpriseSalesExecutive {
  editableField = new EditableField()

  toggleEnterpriseSalesExecutive() {
    this.editableField.toggleEditMode(fieldName)
  }

  selectEnterpriseSalesExecutiveValue(value: string) {
    // TODO: remove this after https://toptal-core.atlassian.net/browse/SPB-2789 is finished
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500)

    this.editableField.selectDropdownValue({
      key: fieldName,
      value
    })
  }

  getEnterpriseSalesExecutive() {
    return this.editableField.get(fieldName)
  }
}

export default EnterpriseSalesExecutive
