import { useCallback } from 'react'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useMutation } from '@staff-portal/data-layer-service'
import { useNotifications } from '@staff-portal/error-handling'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { JOB_UPDATED } from '@staff-portal/jobs'

import { RemoveJobContactDocument } from '../data/remove-job-contact.staff.gql.types'

interface FormParams {
  jobId: string
}

const useRemoveContact = ({ jobId }: FormParams) => {
  const { handleMutationResult } = useHandleMutationResult()
  const { showError } = useNotifications()
  const emitMessage = useMessageEmitter()
  const [removeJobContact, { loading: removeLoading }] = useMutation(
    RemoveJobContactDocument,
    {
      onError: () => showError('Error removing job contact.')
    }
  )

  const handleContactRemove = useCallback(
    async (representativeId, onSuccess?: () => void) => {
      const { data: mutationResult } = await removeJobContact({
        variables: {
          jobId,
          representativeId
        }
      })

      return handleMutationResult({
        mutationResult: mutationResult?.removeJobContact,
        successNotificationMessage: 'Job Contact was successfully removed.',
        onSuccessAction: () => {
          emitMessage(JOB_UPDATED, { jobId })
          onSuccess?.()
        }
      })
    },
    [handleMutationResult, jobId, emitMessage, removeJobContact]
  )

  return {
    handleContactRemove,
    removeLoading
  }
}

export default useRemoveContact
