import { useNotifications } from '@toptal/picasso/utils'
import { useMutation } from '@staff-portal/data-layer-service'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { JOB_UPDATED } from '@staff-portal/jobs'

import { SetJobPriorityDocument } from '../data/set-job-priority.staff.gql.types'
import type { SetJobPriorityForm } from '../components/HighPriorityModal'

const useSetJobPriority = (hideModal: () => void) => {
  const emitMessage = useMessageEmitter()
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const [setJobPriority, { loading }] = useMutation(SetJobPriorityDocument, {
    onError: showError
  })

  const handleSubmit = async ({
    jobId,
    highPriority,
    comment
  }: SetJobPriorityForm) => {
    const { data } = await setJobPriority({
      variables: {
        input: {
          jobId,
          highPriority: highPriority === 'Yes',
          comment
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.setJobPriority,
      successNotificationMessage: 'The job priority was successfully updated.',
      onSuccessAction: () => {
        emitMessage(JOB_UPDATED, { jobId })
        hideModal()
      }
    })
  }

  return { handleSubmit, loading }
}

export default useSetJobPriority
