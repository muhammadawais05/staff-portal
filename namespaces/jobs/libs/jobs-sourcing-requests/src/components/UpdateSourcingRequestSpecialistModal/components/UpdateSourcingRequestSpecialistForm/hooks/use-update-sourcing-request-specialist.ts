import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useNotifications } from '@staff-portal/error-handling'
import { useMutation } from '@staff-portal/data-layer-service'
import { JOB_UPDATED } from '@staff-portal/jobs'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { UpdateSourcingRequestTalentSpecialistDocument } from '../data/update-sourcing-request-specialist'
import { FormValues } from '../types'

type Props = {
  sourcingRequestId?: string | null
  jobId: string
  hideModal: () => void
}

export const useUpdateSourcingRequestSpecialist = ({
  sourcingRequestId,
  jobId,
  hideModal
}: Props) => {
  const emitMessage = useMessageEmitter()
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const [updateSourcingRequesTalentSpecialist] = useMutation(
    UpdateSourcingRequestTalentSpecialistDocument,
    {
      onError: () =>
        showError(
          'An error occurred, the Sourcing Request Talent Specialist was not updated.'
        )
    }
  )

  const handleSubmit = async (params: FormValues) => {
    const { data } = await updateSourcingRequesTalentSpecialist({
      variables: {
        ...params,
        sourcingRequestId: sourcingRequestId || ''
      }
    })

    return handleMutationResult({
      mutationResult: data?.updateSourcingRequestTalentSpecialist,
      successNotificationMessage:
        'The Talent Specialist was successfully updated.',
      onSuccessAction: () => {
        emitMessage(JOB_UPDATED, { jobId })
        hideModal()
      }
    })
  }

  return handleSubmit
}
