import { EditableField } from '~integration/modules/components'

const fieldName = 'applicantSkillIds'

class ApplicantSkillsField {
  editableField = new EditableField()

  get field() {
    return this.editableField.get(fieldName)
  }

  get input() {
    return this.field.find('input:last')
  }

  get saveButton() {
    return cy.getByTestId('inline-tagselector-editor-submit')
  }

  enterEditMode() {
    this.editableField.toggleEditMode(fieldName)
  }

  setApplicantSkill(value: string) {
    this.input.type(value)
  }

  get firstOption() {
    return this.input.get('[role="option"]').eq(0)
  }
}

export default ApplicantSkillsField
