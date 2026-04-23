import { Container, Typography } from '@toptal/picasso'
import React, { useCallback } from 'react'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { PromptModal } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'
import { ENGAGEMENT_UPDATED } from '@staff-portal/engagements'
import { getRoleTypeText } from '@staff-portal/facilities'

import { ApproveRejectedEngagementTrialDocument } from './data/approve-rejected-trial-engagement/approve-rejected-trial-engagement.staff.gql.types'

type Props = {
  engagementId: string
  talentType?: string
  hideModal: () => void
}

const ApproveRejectedTrialModal = ({
  engagementId,
  talentType,
  hideModal
}: Props) => {
  const role = getRoleTypeText(talentType)

  const { handleSubmit: handleMutationSubmit, loading } =
    useModalFormChangeHandler({
      mutationDocument: ApproveRejectedEngagementTrialDocument,
      mutationResultOptions: {
        successNotificationMessage: `${role} was successfully hired.`,
        successMessageEmitOptions: {
          type: ENGAGEMENT_UPDATED,
          payload: { engagementId }
        },
        onSuccessAction: hideModal
      }
    })

  const handleSubmit = useCallback(
    () => handleMutationSubmit({ engagementId }),
    [handleMutationSubmit, engagementId]
  )

  return (
    <PromptModal
      title='Retroactively Approve Trial'
      message={
        <>
          <Typography size='medium'>
            Are you sure you want to approve the trial retroactively and hire{' '}
            {role.toLowerCase()}?
          </Typography>

          <Container top='xsmall'>
            <Typography size='medium'>
              This action will generate invoices for all billing cycles between
              the trial's end date and today. These invoices may be sent
              automatically to the client.
            </Typography>
          </Container>

          <Container top='xsmall'>
            <Typography size='medium'>
              The talent will be paid 100% of the amount due, and the client
              will be invoiced 100%.
            </Typography>
          </Container>
        </>
      }
      submitText={`Hire ${role}`}
      onSubmit={handleSubmit}
      onClose={hideModal}
      open
      loading={loading}
      operationVariables={{
        nodeId: engagementId,
        nodeType: NodeType.ENGAGEMENT,
        operationName: 'approveRejectedEngagementTrial'
      }}
      data-testid='ApproveRejectedTrialModal'
    />
  )
}

export default ApproveRejectedTrialModal
