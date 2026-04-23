import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { useNotifications } from '@staff-portal/error-handling'
import { useMutation } from '@staff-portal/data-layer-service'
import { JOB_UPDATED } from '@staff-portal/jobs'

import { UpdateSourcingRequestStatusDocument } from '../data/update-sourcing-request-status'
import { FormValues } from '../types'

type Props = {
  sourcingRequestId?: string | null
  jobId: string
  hideModal: () => void
}

export const useUpdateSourcingRequestStatus = ({
  sourcingRequestId,
  jobId,
  hideModal
}: Props) => {
  const emitMessage = useMessageEmitter()
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const [updateSourcingRequestStatus] = useMutation(
    UpdateSourcingRequestStatusDocument,
    {
      onError: () =>
        showError(
          'An error occurred, the Sourcing Request Status was not updated.'
        )
    }
  )

  const handleSubmit = async (params: FormValues) => {
    const { data } = await updateSourcingRequestStatus({
      variables: {
        ...params,
        sourcingRequestId: sourcingRequestId || ''
      }
    })

    return handleMutationResult({
      mutationResult: data?.updateSourcingRequestStatus,
      successNotificationMessage:
        'The Sourcing Request Status was successfully updated.',
      onSuccessAction: () => {
        emitMessage(JOB_UPDATED, { jobId })
        hideModal()
      }
    })
  }

  return handleSubmit
}
