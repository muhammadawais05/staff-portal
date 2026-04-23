import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useMutation } from '@staff-portal/data-layer-service'
import { useNotifications } from '@staff-portal/error-handling'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { ChangeEngagementStartDateDocument } from '../data'
import { FormValues } from '../types'
import {
  ENGAGEMENT_BILLING_CYCLES_UPDATE,
  ENGAGEMENT_UPDATED
} from '../../../../../messages'

type Props = {
  engagementId: string
  hideModal: () => void
}

export const useChangeEngagementStartDate = ({
  engagementId,
  hideModal
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()

  const [changeEngagementStartDate] = useMutation(
    ChangeEngagementStartDateDocument,
    {
      onError: () =>
        showError("An error occurred, The Start Date can't be changed.")
    }
  )

  const handleSubmit = async ({ startDate, ...restValues }: FormValues) => {
    const { data } = await changeEngagementStartDate({
      variables: {
        input: {
          ...restValues,
          startDate: startDate ?? '',
          engagementId
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.changeEngagementStartDate,
      successNotificationMessage: 'The Start Date was successfully changed.',
      onSuccessAction: () => {
        emitMessage(ENGAGEMENT_UPDATED, { engagementId })
        emitMessage(ENGAGEMENT_BILLING_CYCLES_UPDATE)
        hideModal()
      }
    })
  }

  return handleSubmit
}
