import { NodeType } from '@staff-portal/graphql'
import { ConfirmationModal } from '@staff-portal/modals-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { Container, Typography } from '@toptal/picasso'
import React, { useCallback } from 'react'

import { ENGAGEMENT_UPDATED } from '../../messages'
import { RevertEngagementTrialToActiveDocument } from './data/revert-engagement-trial-to-active/revert-engagement-trial-to-active.staff.gql.types'

type Props = {
  engagementId: string
  hideModal: () => void
}

const RevertEngagementTrialToActiveModal = ({
  engagementId,
  hideModal
}: Props) => {
  const { handleSubmit: handleMutationSubmit, loading } =
    useModalFormChangeHandler({
      mutationDocument: RevertEngagementTrialToActiveDocument,
      mutationResultOptions: {
        successMessageEmitOptions: {
          type: ENGAGEMENT_UPDATED,
          payload: { engagementId }
        },
        isFormSubmit: true,
        successNotificationMessage:
          'You reverted an engagement to the trial period.',
        onSuccessAction: hideModal
      },
      errorNotificationMessage:
        'An error occurred, unable engagement to revert to trial.'
    })

  const handleSubmit = useCallback(
    (comment?: string) =>
      handleMutationSubmit({
        engagementId,
        comment: comment ?? ''
      }),
    [handleMutationSubmit, engagementId]
  )

  const content = (
    <>
      <Container bottom='small'>
        <Typography size='medium'>
          This action will return the engagement's status to "On Trial", remove
          all existing billing cycles, and create a new trial period.
        </Typography>
      </Container>

      <Container bottom='medium'>
        <Typography size='medium'>
          The talent will be paid 0% of the amount due, and the client will be
          invoiced 0% until the trial is approved.
        </Typography>
      </Container>
    </>
  )

  return (
    <ConfirmationModal
      operationVariables={{
        nodeId: engagementId,
        nodeType: NodeType.ENGAGEMENT,
        operationName: 'revertEngagementTrialToActive'
      }}
      variant='positive'
      required
      label='Comment'
      title='Revert Engagement to Trial Period'
      submitText='Revert to Trial'
      textFieldName='comment'
      placeholder='Please specify a reason.'
      onSubmit={handleSubmit}
      onClose={hideModal}
      loading={loading}
      message={content}
    />
  )
}

export default RevertEngagementTrialToActiveModal
