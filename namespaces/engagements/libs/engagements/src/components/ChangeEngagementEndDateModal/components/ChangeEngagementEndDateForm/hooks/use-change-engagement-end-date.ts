import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useMutation } from '@staff-portal/data-layer-service'
import { useNotifications } from '@staff-portal/error-handling'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { ChangeEngagementEndDateDocument } from '../data'
import { FormValues } from '../types'
import {
  ENGAGEMENT_BILLING_CYCLES_UPDATE,
  ENGAGEMENT_UPDATED
} from '../../../../../messages'

export const useChangeEngagementEndDate = ({
  engagementId,
  hideModal
}: {
  engagementId: string
  hideModal: () => void
}) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()

  const [changeEngagementEndDate] = useMutation(
    ChangeEngagementEndDateDocument,
    {
      onError: () =>
        showError("An error occurred, the engagement date can't be changed.")
    }
  )

  const handleSubmit = async (values: FormValues) => {
    const { data } = await changeEngagementEndDate({
      variables: {
        input: {
          engagementId,
          endDate: values.endDate ?? '',
          comment: values.comment
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.changeEngagementEndDate,
      successNotificationMessage: `The End Date was successfully changed.`,
      onSuccessAction: () => {
        emitMessage(ENGAGEMENT_UPDATED, { engagementId })
        emitMessage(ENGAGEMENT_BILLING_CYCLES_UPDATE)
        hideModal()
      }
    })
  }

  return handleSubmit
}
