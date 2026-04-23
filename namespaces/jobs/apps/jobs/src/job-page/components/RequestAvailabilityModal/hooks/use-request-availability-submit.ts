import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useMutation } from '@staff-portal/data-layer-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { JOB_UPDATED } from '@staff-portal/jobs'

import { CreateAvailabilityRequestForJobDocument } from '../data/create-availability-request-for-job.staff.gql.types'
import { CreateAvailabilityRequestForJobForm } from '../RequestAvailabilityModal'

interface Props {
  jobId: string
  hideModal: () => void
}

const useRequestAvailabilitySubmit = ({ hideModal, jobId }: Props) => {
  const { showError } = useNotifications()
  const emitMessage = useMessageEmitter()
  const { handleMutationResult } = useHandleMutationResult()

  const [createAvailabilityRequestForJob, { loading }] = useMutation(
    CreateAvailabilityRequestForJobDocument,
    {
      onError: () =>
        showError(
          'An error occurred, the availability request was not created.'
        )
    }
  )

  const handleSubmit = async ({
    talentIds,
    comment
  }: CreateAvailabilityRequestForJobForm) => {
    const talentIdsList = talentIds.map(item => item.node.id)

    const { data } = await createAvailabilityRequestForJob({
      variables: {
        input: {
          talentIds: talentIdsList,
          comment,
          jobId
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.createAvailabilityRequestForJob,
      successNotificationMessage:
        'The Availability Request was successfully created.',
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

export default useRequestAvailabilitySubmit
