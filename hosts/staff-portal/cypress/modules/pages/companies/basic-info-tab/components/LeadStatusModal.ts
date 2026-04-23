import { FormModal } from '~integration/modules/modals'

const modalComponentName = 'LeadStatusModal'

class LeadStatusModal extends FormModal {
  getLeadStatusEditButton() {
    return cy.getByTestId('LeadStatus-edit-button')
  }

  getFieldViewer() {
    return cy.getByTestId('LeadStatus-value')
  }

  getLeadStatusCommentField() {
    return cy.getByTestId(`${modalComponentName}-comment`)
  }

  selectStatus(text: string) {
    return cy.selectMenuOptionByText({
      field: `${modalComponentName}-status`,
      text
    })
  }

  selectNextAction(text: string) {
    return cy.selectMenuOptionByText({
      field: `${modalComponentName}-nextAction`,
      text
    })
  }
}

export default LeadStatusModal
