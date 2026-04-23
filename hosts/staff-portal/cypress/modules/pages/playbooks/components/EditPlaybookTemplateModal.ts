import { FormModal } from '~integration/modules/modals'

const formComponentName = 'edit-playbook-template-form'

class EditPlaybookTemplateModal extends FormModal {
  get description() {
    return cy.getByTestId(`${formComponentName}-description-field`)
  }

  get details() {
    return cy.getByTestId(`${formComponentName}-details-field`)
  }

  get priority() {
    return cy.getByTestId(`${formComponentName}-priority-field`)
  }

  get dueDateRuleAmount() {
    return cy.getByTestId(`${formComponentName}-dueDateRuleAmount-field`)
  }
}

export default EditPlaybookTemplateModal
