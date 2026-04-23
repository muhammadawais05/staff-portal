import refundDepositsStubs from '~integration/mocks/schema-updates/job/refund-deposits-job-stub-updates'
import { JobPage } from '~integration/modules/pages/jobs'
import RefundJobDepositModal from '~integration/modules/pages/jobs/components/RefundJobDepositModal'

describe('Job Page -> Refund deposit', () => {
  const page = new JobPage()
  const modal = new RefundJobDepositModal()

  it('Refund deposit', () => {
    refundDepositsStubs()

    page.visit()
    page.actions.click()
    page.actions.contains('Refund Deposit').click()

    modal.submitButton.click()

    cy.getNotification().should(
      'have.text',
      'Deposit refund has been successfully initiated.'
    )
  })
})
