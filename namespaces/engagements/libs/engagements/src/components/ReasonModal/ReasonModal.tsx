import React, { ReactNode } from 'react'
import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { NodeType } from '@staff-portal/graphql'

import { RejectEngagementOnInterviewMutation } from '../RejectEngagementCandidateModal/data'
import { ReasonForm } from './components'
import { FormValues } from './types'
import {
  getMutationResult,
  MUTATION_HOOK_MAPPING,
  EngagementReasonMutations,
  getReasonAction
} from './utils'
import { useNavigateToJobPage } from '../../services'
import { ENGAGEMENT_UPDATED } from '../../messages'

type Props = {
  hideModal: () => void
  engagementId: string
  title: string
  description?: ReactNode
  submitLabel: string
  errorMessage: string
  successNotificationMessage: string
  mutationName: EngagementReasonMutations
}

const ReasonModal = ({
  hideModal,
  engagementId,
  title,
  description,
  submitLabel,
  errorMessage,
  successNotificationMessage,
  mutationName
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()
  const { navigateToJobPage } = useNavigateToJobPage()

  const reasonAction = getReasonAction(mutationName)
  const useMutation = MUTATION_HOOK_MAPPING[mutationName]
  const [mutation, { loading: mutationLoading }] = useMutation({
    onError: () => showError(errorMessage)
  })

  const handleSubmit = async ({ reasonId, comment }: FormValues) => {
    const { data } = await mutation({
      variables: {
        input: {
          engagementId,
          reasonId,
          comment
        }
      }
    })

    const mutationResult = getMutationResult({ mutationName, data })

    return handleMutationResult({
      mutationResult,
      successNotificationMessage,
      onSuccessAction: () => {
        hideModal()

        if (mutationName === 'rejectEngagementOnInterview') {
          const result = navigateToJobPage(
            (data as RejectEngagementOnInterviewMutation)
              .rejectEngagementOnInterview?.engagement?.job?.id
          )

          if (!result) {
            emitMessage(ENGAGEMENT_UPDATED, { engagementId })
          }
        } else {
          emitMessage(ENGAGEMENT_UPDATED, { engagementId })
        }
      }
    })
  }

  return (
    <Modal
      open
      size='small'
      onClose={hideModal}
      data-testid='ReasonModal'
      defaultTitle={title}
      operationVariables={{
        nodeId: engagementId,
        nodeType: NodeType.ENGAGEMENT,
        operationName: mutationName
      }}
    >
      <ModalForm<FormValues> title={title} onSubmit={handleSubmit}>
        <ReasonForm
          loading={mutationLoading}
          description={description}
          reasonAction={reasonAction}
          submitLabel={submitLabel}
          onClose={hideModal}
        />
      </ModalForm>
    </Modal>
  )
}

export default ReasonModal
