import { AvailabilityRequestStatus } from '@staff-portal/graphql/staff'

import { JobPage } from '~integration/modules/pages/jobs'
import { ENTER_KEY } from '~integration/utils'
import { successOperationMock } from '~integration/mocks/operations'
import { SendEmailModal } from '~integration/modules/modals'
import {
  updateJobAvailabilityRequestsFilterStatusMocks,
  updateJobAvailabilityRequestsSectionsMocks
} from '~integration/mocks/schema-updates/job'

describe('Job Availability Requests Section', () => {
  const page = new JobPage()
  const sendEmailForm = new SendEmailModal()

  const { jobAvailabilityRequestsSection: section } = page
  const { withdrawModal: withdrawForm } = section

  const assertByFilterStatus = (status: AvailabilityRequestStatus) => {
    updateJobAvailabilityRequestsFilterStatusMocks(status)
    section.selectRadioInput('Status', status)
    section.getInputChecked().should('have.value', status)
  }

  beforeEach(() => {
    updateJobAvailabilityRequestsSectionsMocks()
    page.visit()
  })

  describe('When filtering the availability requests', () => {
    it('filters by status', () => {
      assertByFilterStatus(AvailabilityRequestStatus.PENDING)
      assertByFilterStatus(AvailabilityRequestStatus.CANCELLED)
      assertByFilterStatus(AvailabilityRequestStatus.CONFIRMED)
      assertByFilterStatus(AvailabilityRequestStatus.EXPIRED)
      assertByFilterStatus(AvailabilityRequestStatus.REJECTED)
      assertByFilterStatus(AvailabilityRequestStatus.WITHDRAWN)
      assertByFilterStatus(AvailabilityRequestStatus.PENDING)
    })
  })

  describe('Action: Send Email', () => {
    describe('when the send email form is submitted', () => {
      it.skip('displays success notification on success', () => {
        section.expandAvailabilityRequest()
        section.getSendEmailButton().click()
        cy.updateStaffMocks({
          Mutation: {
            sendEmailTo: successOperationMock
          }
        })

        sendEmailForm.emailTemplateField
          .click()
          .trigger('keydown', { keyCode: ENTER_KEY })

        sendEmailForm.submitButton.click()

        cy.getNotification().should(
          'have.text',
          'The email was successfully sent.'
        )
      })
    })
  })

  describe('Action: Withdraw Availability Request', () => {
    describe('when the withdraw form is submitted', () => {
      it.skip('displays success notification  on success', () => {
        section.expandAvailabilityRequest()
        cy.updateStaffMocks({
          Mutation: {
            withdrawAvailabilityRequest: successOperationMock
          }
        })
        section.getWithdrawButton().click()

        withdrawForm.selectReasonFieldMenuOption('Hello World')
        withdrawForm.submitButton.click()

        cy.getNotification().should(
          'have.text',
          'The Availability Request is now withdrawn.'
        )
      })
    })
  })
})
