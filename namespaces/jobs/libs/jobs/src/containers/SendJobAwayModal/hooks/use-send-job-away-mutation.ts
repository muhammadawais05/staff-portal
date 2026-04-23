import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { SendJobAwayInput } from '@staff-portal/graphql/staff'
import { useMutation } from '@staff-portal/data-layer-service'
import { useNotifications } from '@staff-portal/error-handling'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { JOB_UPDATED } from '../../../messages'
import { SendJobAwayDocument } from '../data/send-job-away.staff.gql.types'
export interface SendJobAwayFormValues
  extends Omit<SendJobAwayInput, 'jobId'> {}

type Props = {
  jobId: string
  onCompleted?: () => void
}

const useSendJobAwayMutation = ({ jobId, onCompleted }: Props) => {
  const emitMessage = useMessageEmitter()
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const [SendJobAway, { loading }] = useMutation(SendJobAwayDocument, {
    onError: () =>
      showError('An error occured, the operation was not completed.')
  })

  const handleSubmit = async (values: SendJobAwayFormValues) => {
    const { data: SendJobAwayData } = await SendJobAway({
      variables: {
        input: {
          ...values,
          jobId
        }
      }
    })

    return handleMutationResult({
      mutationResult: SendJobAwayData?.sendJobAway,
      successNotificationMessage: 'The Job was successfully sent away.',
      onSuccessAction: () => {
        onCompleted?.()
        emitMessage(JOB_UPDATED, { jobId })
      }
    })
  }

  return {
    handleSubmit,
    mutationLoading: loading
  }
}

export default useSendJobAwayMutation
