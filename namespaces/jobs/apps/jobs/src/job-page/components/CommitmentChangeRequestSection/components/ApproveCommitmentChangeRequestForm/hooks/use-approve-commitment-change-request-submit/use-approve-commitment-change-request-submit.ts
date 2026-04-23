import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { JobCommitment } from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { JOB_UPDATED } from '@staff-portal/jobs'

import { ApproveCommitmentChangeRequestDataFragment } from '../../../ApproveCommitmentChangeRequestModal/data'
import { useApproveCommitmentChangeRequest } from '../../data'
import { ApproveCommitmentChangeRequestFormValues } from '../../types'

type Props = {
  jobId: string
  commitmentChangeRequest: ApproveCommitmentChangeRequestDataFragment
  hideModal: () => void
}

const useApproveCommitmentChangeRequestSubmit = ({
  jobId,
  commitmentChangeRequest: { id: commitmentChangeRequestId, newAvailability },
  hideModal
}: Props) => {
  const emitMessage = useMessageEmitter()
  const { handleMutationResult } = useHandleMutationResult()

  const [mutate] = useApproveCommitmentChangeRequest()
  const handleSubmit = async ({
    notifyTalent = false,
    notifyCompany = false,
    changeDate,
    ...restFormData
  }: ApproveCommitmentChangeRequestFormValues) => {
    if (!newAvailability || !commitmentChangeRequestId) {
      return
    }

    const { data: mutationData } = await mutate({
      variables: {
        input: {
          commitment: newAvailability as unknown as JobCommitment,
          commitmentChangeRequestId,
          notifyTalent,
          notifyCompany,
          changeDate,
          ...restFormData
        }
      }
    })

    return handleMutationResult({
      mutationResult: mutationData?.approveCommitmentChangeRequest,
      successNotificationMessage:
        'The Commitment Change Request was successfully approved.',
      onSuccessAction: () => {
        emitMessage(JOB_UPDATED, { jobId })
        hideModal()
      }
    })
  }

  return { handleSubmit }
}

export default useApproveCommitmentChangeRequestSubmit
