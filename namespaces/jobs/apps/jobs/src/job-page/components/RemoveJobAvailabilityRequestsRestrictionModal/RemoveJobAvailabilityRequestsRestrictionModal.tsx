import React from 'react'
import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useMutation } from '@staff-portal/data-layer-service'
import {
  ConfirmationModal,
  ModalComponentBaseProps
} from '@staff-portal/modals-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { JOB_UPDATED } from '@staff-portal/jobs'
import { NodeType } from '@staff-portal/graphql'

import { RemoveJobAvailabilityRequestsRestrictionDocument } from './data/remove-job-availability-requests-restriction.staff.gql.types'

interface Props extends ModalComponentBaseProps {
  jobId: string
}

const RemoveJobAvailabilityRequestsRestrictionModal = ({
  jobId,
  hideModal
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()

  const [removeJobAvailabilityRequestsRestriction, { loading }] = useMutation(
    RemoveJobAvailabilityRequestsRestrictionDocument,
    {
      onError: () =>
        showError(
          'An error occurred, the restrictions for the job was not lifted.'
        )
    }
  )

  const handleSubmit = async (comment = '') => {
    const { data } = await removeJobAvailabilityRequestsRestriction({
      variables: {
        input: {
          jobId,
          comment
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.removeJobAvailabilityRequestsRestriction,
      successNotificationMessage:
        'The restrictions for the job was lifted successfully.',
      onSuccessAction: () => {
        emitMessage(JOB_UPDATED, { jobId })
        hideModal()
      }
    })
  }

  return (
    <ConfirmationModal
      required
      operationVariables={{
        nodeId: jobId,
        nodeType: NodeType.JOB,
        operationName: 'removeJobAvailabilityRequestsRestriction'
      }}
      variant='positive'
      placeholder='Please provide a reason for removing restrictions for availability requests.'
      title='Remove Restrictions for Availability Requests'
      submitText='Remove Restrictions'
      textFieldName='comment'
      label='Comment'
      loading={loading}
      onClose={hideModal}
      onSubmit={handleSubmit}
    />
  )
}

export default RemoveJobAvailabilityRequestsRestrictionModal
