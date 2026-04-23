import { EditableField } from '~integration/modules/components'
import CareerPagesEditor from './components/CareerPagesEditor'

class InDepthCompanyResearchSection {
  careerPagesEditor = new CareerPagesEditor()
  editableField = new EditableField()

  editFoundingYear() {
    this.editableField.toggleEditMode('foundingYear')
  }

  setFoundingYear(value: string) {
    this.editableField.getInput('foundingYear').clear()

    return this.editableField.updateInput({
      key: 'foundingYear',
      value
    })
  }

  getFoundingYear() {
    return this.editableField.get('foundingYear')
  }

  editEmployeeCountEstimation() {
    this.editableField.toggleEditMode('currentEmployeeCount')
  }

  setEmployeeCountEstimation(value: string) {
    this.editableField.getInput('currentEmployeeCount').clear()

    return this.editableField.updateInput({
      key: 'currentEmployeeCount',
      value
    })
  }

  getEmployeeCountEstimation() {
    return this.editableField.get('currentEmployeeCount')
  }

  editIndustry() {
    this.editableField.toggleEditMode('industry')
  }

  setIndustry(value: string) {
    this.editableField.selectDropdownValue({
      key: 'industry',
      value
    })
  }

  getIndustry() {
    return this.editableField.get('industry')
  }

  editRevenueRange() {
    this.editableField.toggleEditMode('revenueRange')
  }

  setRevenueRange(value: string) {
    this.editableField.selectDropdownValue({
      key: 'revenueRange',
      value
    })
  }

  getRevenueRange() {
    return this.editableField.get('revenueRange')
  }
}

export default InDepthCompanyResearchSection
