import { EditableField } from '~integration/modules/components'

class FinancialInformationSection {
  editableField = new EditableField()

  editStage() {
    this.editableField.toggleEditMode('stage')
  }

  setStage(value: string) {
    this.editableField.selectDropdownValue({
      key: 'stage',
      value
    })
  }

  getStage() {
    return this.editableField.get('stage')
  }

  editTotalFunding() {
    this.editableField.toggleEditMode('totalFunding')
  }

  setTotalFunding(value: string) {
    return this.editableField.updateInput({
      key: 'totalFunding',
      value
    })
  }

  getTotalFunding() {
    return this.editableField.get('totalFunding')
  }

  editAcquiredBy() {
    this.editableField.toggleEditMode('acquiredBy')
  }

  setAcquiredBy(value: string) {
    return this.editableField.updateInput({
      key: 'acquiredBy',
      value
    })
  }

  getAcquiredBy() {
    return this.editableField.get('acquiredBy')
  }

  editCompanies() {
    this.editableField.toggleEditMode('acquiredCompanies')
  }

  setAcquiredCompanies(value: string) {
    return this.editableField.updateInput({
      key: 'acquiredCompanies',
      value
    })
  }

  getAcquiredCompanies() {
    return this.editableField.get('acquiredCompanies')
  }
}

export default FinancialInformationSection
