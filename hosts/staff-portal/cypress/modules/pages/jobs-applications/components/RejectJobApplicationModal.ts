import { FormModal } from '../../../modals'

class RejectJobApplicationModal extends FormModal {
  selectReason() {
    cy.getByTestId('job-application-reject-reason-id')
      .find('input:last')
      .click()

    cy.get(`[role="listbox"]`).within(() => {
      cy.get('li:first').click({ force: true })
    })
  }

  getCommentField() {
    return cy.getByTestId('job-application-reject-comment')
  }
}

export default RejectJobApplicationModal
