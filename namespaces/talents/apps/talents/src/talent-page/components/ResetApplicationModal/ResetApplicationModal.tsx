import { Container, Typography } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import React from 'react'
import { ConfirmationModal } from '@staff-portal/modals-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { TALENT_UPDATED } from '@staff-portal/talents'
import { NodeType } from '@staff-portal/graphql'

import { useResetRejectedApplication } from './data/reset-rejected-talent-application.staff.gql'

export type Props = {
  hideModal: () => void
  onSubmitSuccess: (emailTemplateId?: string) => void
  talentId: string
}

const message = (
  <Container bottom='medium'>
    <Typography size='medium' weight='semibold'>
      Do you really want to reset this application?
    </Typography>
    <Container top='medium'>
      <Typography size='medium'>
        By confirming this action, all the screening steps associated with this
        talent profile will be reset and the talent user will be sent back to
        the onboarding step and required to fill out the application form again.
      </Typography>
    </Container>
  </Container>
)

const ResetApplicationModal = ({
  hideModal,
  onSubmitSuccess,
  talentId
}: Props) => {
  const { showError, showSuccess } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()
  const [resetApplication, { loading }] = useResetRejectedApplication({
    onError: () => showError('Unable to reset application.'),
    onCompleted: data => {
      if (data.resetRejectedTalentApplication?.success) {
        emitMessage(TALENT_UPDATED, { talentId })
      }
    }
  })

  const handleSubmit = async (comment = '') => {
    const { data } = await resetApplication({
      variables: {
        input: {
          talentId,
          comment
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.resetRejectedTalentApplication,
      onSuccessAction: ({ emailTemplate }) => {
        showSuccess('Application has been reset.')
        hideModal()
        onSubmitSuccess(emailTemplate?.id)
      }
    })
  }

  return (
    <ConfirmationModal
      operationVariables={{
        nodeId: talentId,
        nodeType: NodeType.TALENT,
        operationName: 'resetRejectedTalentApplication'
      }}
      required
      loading={loading}
      variant='positive'
      label='Comment'
      title='Reset Application'
      placeholder='Please specify a reason'
      textFieldName='comment'
      message={message}
      submitText='Reset Application'
      onSubmit={handleSubmit}
      onClose={hideModal}
    />
  )
}

export default ResetApplicationModal
