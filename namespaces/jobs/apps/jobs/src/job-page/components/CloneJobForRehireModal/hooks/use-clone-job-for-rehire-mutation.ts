import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { JobCommitment, Scalars } from '@staff-portal/graphql/staff'
import { useMutation } from '@staff-portal/data-layer-service'
import { useNotifications } from '@staff-portal/error-handling'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { JOB_UPDATED } from '@staff-portal/jobs'

import { CloneJobForRehireDocument } from '../data/clone-job-for-rehire.staff.gql.types'

type Props = {
  jobId: string
  hideModal: () => void
}

const useCloneJobForRehireMutation = ({ jobId, hideModal }: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const [cloneJobForRehire, { loading }] = useMutation(
    CloneJobForRehireDocument,
    {
      onError: () =>
        showError('An error occurred, the job was not cloned for rehire.')
    }
  )
  const emitMessage = useMessageEmitter()
  const handleSubmit = async ({
    commitment,
    startDate
  }: {
    commitment: JobCommitment
    startDate: Scalars['Date']
  }) => {
    const { data } = await cloneJobForRehire({
      variables: {
        input: {
          jobId,
          commitment,
          startDate
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.cloneJobForRehire,
      successNotificationMessage: 'Job rehiring process has been started.',
      onSuccessAction: () => {
        emitMessage(JOB_UPDATED, { jobId })
        hideModal()
      }
    })
  }

  return {
    handleSubmit,
    loading
  }
}

export default useCloneJobForRehireMutation
