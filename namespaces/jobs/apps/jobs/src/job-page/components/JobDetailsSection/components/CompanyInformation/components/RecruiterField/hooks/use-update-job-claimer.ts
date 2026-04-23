import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useMutation } from '@staff-portal/data-layer-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { JOB_UPDATED } from '@staff-portal/jobs'

import { UpdateJobClaimerDocument } from '../data/update-job-claimer.staff.gql.types'
import type { UpdateJobClaimerForm } from '../components/RecruiterModal'

const useUpdateJobClaimer = (hideModal: () => void) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()

  const [updateJobClaimer, { loading }] = useMutation(
    UpdateJobClaimerDocument,
    {
      onError: () =>
        showError('An error occurred, the Job Recruiter was not reassigned.')
    }
  )

  const handleSubmit = async ({
    jobId,
    claimerId,
    comment
  }: UpdateJobClaimerForm) => {
    const { data } = await updateJobClaimer({
      variables: {
        input: {
          jobId,
          claimerId,
          comment
        }
      }
    })

    const claimerName = data?.updateJobClaimer?.job?.claimer?.fullName

    return handleMutationResult({
      mutationResult: data?.updateJobClaimer,
      successNotificationMessage: `The Job Recruiter was successfully changed${
        claimerName ? ` to ${claimerName}` : ''
      }.`,
      onSuccessAction: () => {
        emitMessage(JOB_UPDATED, { jobId })
        hideModal()
      }
    })
  }

  return { handleSubmit, loading }
}

export default useUpdateJobClaimer
