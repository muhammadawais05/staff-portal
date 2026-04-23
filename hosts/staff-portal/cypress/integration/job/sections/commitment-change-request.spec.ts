import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import { JobPage } from '~integration/modules/pages/jobs'
import { updateCommitmentChangeRequestMocks } from '~integration/mocks/schema-updates/job'
import { FormModal, SendEmailModal } from '~integration/modules/modals'
import { ApproveCommitmentChangeRequestModal } from '~integration/modules/pages/jobs/components'
import { daysFromNow, ENTER_KEY } from '~integration/utils'

// TODO - it will be refactor to use fetch stubbing in https://toptal-core.atlassian.net/browse/SP-1839
// eslint-disable-next-line jest/no-disabled-tests
describe.skip('Job page -> Commitment Change Request', () => {
  const sendEmailModal = new SendEmailModal()
  const approveCommitmentChangeRequestModal =
    new ApproveCommitmentChangeRequestModal()
  const modal = new FormModal()

  const page = new JobPage()
  const { commitmentChangeRequestSection: section } = page

  it('displays `Commitment Change Request`', () => {
    page.visit()

    // approve
    updateCommitmentChangeRequestMocks({
      approveCommitmentChangeRequestCallable: OperationCallableTypes.ENABLED
    })

    section.getApproveButton().click()

    approveCommitmentChangeRequestModal
      .getChangeDateField()
      .find('input')
      .clear()
      .type(daysFromNow(7))
      .trigger('keydown', { keyCode: ENTER_KEY })

    approveCommitmentChangeRequestModal.getTalentRateField().type('100')

    approveCommitmentChangeRequestModal.getCompanyRateField().type('200')

    approveCommitmentChangeRequestModal.submitButton.click()

    // reject
    updateCommitmentChangeRequestMocks({
      rejectCommitmentChangeRequestCallable: OperationCallableTypes.ENABLED
    })

    section.getSection().should('contain.text', 'Commitment Change Request')

    section.getRejectButton().click()

    updateCommitmentChangeRequestMocks({
      partialJob: {
        pendingCommitmentChangeRequest: null
      }
    })

    modal.comment.type('Reject please.')
    modal.submitButton.click()

    cy.getNotification().should(
      'contain',
      'Commitment change request was successfully rejected.'
    )

    sendEmailModal.close()
    section.getSection().should('not.exist')
  })
})
