import { enabledOperationMock } from '~integration/mocks'
import { getClientOperations } from '~integration/mocks/fragments'
import { updateCompanyApplicantsActionsStubs } from '~integration/mocks/schema-updates/company-applicants'
import { FormModal } from '~integration/modules/modals'
import CompanyApplicants, {
  CreateClaimerModal
} from '~integration/modules/pages/companies/applicants-page'

describe('Company Applicants Page -> Actions', () => {
  const page = new CompanyApplicants()
  const confirmationModal = new FormModal()
  const createClaimerModal = new CreateClaimerModal()

  beforeEach(() => {
    updateCompanyApplicantsActionsStubs()
  })

  describe('Delete Company Applicant', () => {
    it('opens modal and submits the form', () => {
      updateCompanyApplicantsActionsStubs({
        operations: getClientOperations({
          rejectClient: enabledOperationMock()
        })
      })

      page.visit()

      page.actions.contains('Delete').click()

      confirmationModal.comment.type('c')
      confirmationModal.setDropdown('reasonId', 'Budget constraints')

      updateCompanyApplicantsActionsStubs({
        operations: getClientOperations({
          restoreClient: enabledOperationMock()
        })
      })

      confirmationModal.submitButton.click()

      cy.getNotification()
        .should(
          'have.text',
          'The Company Application was successfully deleted.'
        )
        .find('button')
        .click()
    })
  })

  describe('Restore Company Applicant', () => {
    it('opens modal and submits the form', () => {
      page.actions.contains('Restore').click()

      confirmationModal.comment.type('c')

      updateCompanyApplicantsActionsStubs({
        operations: getClientOperations({
          markClientAsBadLead: enabledOperationMock()
        })
      })

      confirmationModal.submitButton.click()

      cy.getNotification()
        .should('have.text', 'The Applicant was successfully restored.')
        .find('button')
        .click()
    })
  })

  describe('Mark Company Applicant as Bad Lead', () => {
    it('opens modal and submits the form', () => {
      page.actions.contains('Bad Lead').click()

      confirmationModal.comment.type('c')
      confirmationModal.setDropdown('reasonId', 'Budget constraints')

      updateCompanyApplicantsActionsStubs({
        operations: getClientOperations({
          restoreClientFromBadLead: enabledOperationMock()
        })
      })

      confirmationModal.submitButton.click()

      cy.getNotification()
        .should('have.text', 'Client has been marked as bad lead.')
        .find('button')
        .click()
    })
  })

  describe('Restore Company Applicant from Bad Lead', () => {
    it('opens modal and submits the form', () => {
      page.actions.contains('Restore From Bad Lead').click()

      confirmationModal.comment.type('c')

      updateCompanyApplicantsActionsStubs({
        operations: getClientOperations({
          createClientClaimer: enabledOperationMock()
        })
      })

      confirmationModal.submitButton.click()

      cy.getNotification()
        .should('have.text', 'Client has been restored from Bad Lead status.')
        .find('button')
        .click()
    })
  })

  describe('Claim Company Applicant', () => {
    it('opens modal and submits the form', () => {
      page.actions.contains('Claim').click()

      createClaimerModal.submitButton.click()

      cy.getNotification()
        .should(
          'have.text',
          'The Company was successfully claimed and assigned to you.'
        )
        .find('button')
        .click()

      cy.url().should('include', '/clients/123')
      cy.go('back').end()
    })
  })
})
