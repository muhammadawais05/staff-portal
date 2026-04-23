import { FormModal } from '.'

class SendEmailModal extends FormModal {
  get emailTemplateField() {
    return cy.getByTestId('EmailTemplatesField').find('input:last')
  }

  get subjectField() {
    return cy.getByTestId('SubjectField').find('input:last')
  }

  get emailBody() {
    return cy.getByTestId('EmailBodyField-input').find('textarea:first')
  }

  get cancelButton() {
    return cy.getByTestId('send-email-modal-cancel-button')
  }
}

export default SendEmailModal
