import { useNavigate } from '@staff-portal/navigation'
import { CloneJobInput } from '@staff-portal/graphql/staff'
import { decodeEntityId, useMutation } from '@staff-portal/data-layer-service'
import { useNotifications } from '@staff-portal/error-handling'
import { getJobPath } from '@staff-portal/routes'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { JOB_CLONED } from '@staff-portal/jobs'

import { CloneJobDocument } from '../data/clone-job.staff.gql.types'

export interface CloneJobFormValues
  extends Omit<CloneJobInput, 'jobId' | 'toptalProjects'> {
  toptalProjects: 'true' | 'false'
}

type Props = {
  jobId: string
  onCompleted?: () => void
}

const useCloneJobMutation = ({ jobId, onCompleted }: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const navigate = useNavigate()
  const emitMessage = useMessageEmitter()
  const [cloneJob, { loading }] = useMutation(CloneJobDocument, {
    onError: () => showError('An error occured, the job was not cloned.')
  })

  const handleSubmit = async (values: CloneJobFormValues) => {
    const { data: cloneJobData } = await cloneJob({
      variables: {
        input: {
          ...values,
          jobId,
          toptalProjects: values.toptalProjects === 'true'
        }
      }
    })

    return handleMutationResult({
      mutationResult: cloneJobData?.cloneJob,
      successNotificationMessage: 'The Job was successfully cloned.',
      onSuccessAction: () => {
        emitMessage(JOB_CLONED, { jobId })
        onCompleted?.()
        navigate(
          getJobPath(
            decodeEntityId(cloneJobData?.cloneJob?.jobClone?.id as string).id
          )
        )
      }
    })
  }

  return {
    handleSubmit,
    mutationLoading: loading
  }
}

export default useCloneJobMutation
