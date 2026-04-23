import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useMutation } from '@staff-portal/data-layer-service'
import { useNotifications } from '@staff-portal/error-handling'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { JOB_UPDATED } from '@staff-portal/jobs'

import { RefundJobDepositDocument } from '../data/refund-job-deposit.staff.gql.types'

type Props = {
  jobId: string
  onCompleted?: () => void
}

const useRefundJobDepositMutation = ({ jobId, onCompleted }: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()

  const [refundJobDeposit, { loading }] = useMutation(
    RefundJobDepositDocument,
    {
      onError: () =>
        showError(
          'An error occured, the deposit refund has not been initiated.'
        )
    }
  )

  const handleSubmit = async () => {
    const { data: refundJobDepositData } = await refundJobDeposit({
      variables: {
        input: {
          jobId
        }
      }
    })

    return handleMutationResult({
      mutationResult: refundJobDepositData?.refundJobDeposit,
      successNotificationMessage:
        'Deposit refund has been successfully initiated.',
      onSuccessAction: () => {
        emitMessage(JOB_UPDATED, { jobId })
        onCompleted?.()
      }
    })
  }

  return {
    handleSubmit,
    mutationLoading: loading
  }
}

export default useRefundJobDepositMutation
