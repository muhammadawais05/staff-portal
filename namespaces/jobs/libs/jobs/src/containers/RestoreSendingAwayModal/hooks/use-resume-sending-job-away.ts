import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useMutation } from '@staff-portal/data-layer-service'
import { useNotifications } from '@staff-portal/error-handling'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { JOB_UPDATED } from '../../../messages'
import { ResumeSendingJobAwayDocument } from '../data'

export const useResumeSendingJobAway = ({
  jobId,
  hideModal
}: {
  jobId: string
  hideModal: () => void
}) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()

  const [resumeSendingJobAway] = useMutation(ResumeSendingJobAwayDocument, {
    onError: () => showError('Unable to resume sending job away.')
  })

  const handleSubmit = async () => {
    const { data } = await resumeSendingJobAway({ variables: { jobId } })

    return handleMutationResult({
      mutationResult: data?.resumeSendingJobAway,
      successNotificationMessage: 'The Job was successfully restored.',
      onSuccessAction: () => {
        hideModal()
        emitMessage(JOB_UPDATED, { jobId })
      }
    })
  }

  return {
    resumeSendingJobAway: handleSubmit
  }
}
