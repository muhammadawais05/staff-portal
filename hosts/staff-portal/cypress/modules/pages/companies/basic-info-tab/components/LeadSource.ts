import { EditableField } from '~integration/modules/components'

const fieldName = 'leadSource'

class LeadSource {
  editableField = new EditableField()

  toggleLeadSource() {
    return this.editableField.toggleEditMode(fieldName)
  }

  selectLeadSource(value: string) {
    return this.editableField.selectDropdownValue({
      key: fieldName,
      value
    })
  }

  getLeadSource() {
    return this.editableField.get(fieldName)
  }
}

export default LeadSource
