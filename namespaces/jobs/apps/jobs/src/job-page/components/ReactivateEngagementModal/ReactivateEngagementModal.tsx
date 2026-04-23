import { Container, Typography } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import React from 'react'
import { useMutation } from '@staff-portal/data-layer-service'
import { ConfirmationModal } from '@staff-portal/modals-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { NodeType } from '@staff-portal/graphql'
import { ENGAGEMENT_UPDATED } from '@staff-portal/engagements'

import { ReactivateEngagementDocument } from './data/reactivate-engagement/reactivate-engagement.staff.gql.types'

type Props = {
  engagementId: string
  hideModal: () => void
}

const ReactivateEngagementModal = ({ engagementId, hideModal }: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()

  const [reactivateEngagement, { loading }] = useMutation(
    ReactivateEngagementDocument,
    {
      onError: () =>
        showError('An error occurred, unable to reactivate engagement.')
    }
  )

  const handleSubmit = async (comment = '') => {
    const { data } = await reactivateEngagement({
      variables: { input: { engagementId, comment } }
    })

    return handleMutationResult({
      mutationResult: data?.reactivateEngagement,
      successNotificationMessage:
        'The engagement was successfully reactivated.',
      onSuccessAction: () => {
        hideModal()
        emitMessage(ENGAGEMENT_UPDATED, { engagementId })
      }
    })
  }

  const title = 'Reactivate Engagement'

  const content = (
    <Container bottom='medium'>
      <Typography size='medium'>
        This action will generate invoices for all cycles between the job's end
        date and today's date. These invoices may be sent automatically to
        clients. Are you sure you want to reactivate engagement?
      </Typography>
    </Container>
  )

  return (
    <ConfirmationModal
      variant='positive'
      required
      label='Comment'
      placeholder='Please specify a reason.'
      title={title}
      submitText={title}
      textFieldName='comment'
      onSubmit={handleSubmit}
      onClose={hideModal}
      loading={loading}
      message={content}
      operationVariables={{
        nodeId: engagementId,
        nodeType: NodeType.ENGAGEMENT,
        operationName: 'reactivateEngagement'
      }}
    />
  )
}

export default ReactivateEngagementModal
