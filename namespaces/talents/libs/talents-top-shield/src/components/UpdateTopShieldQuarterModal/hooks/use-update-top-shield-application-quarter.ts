import { useNotifications } from '@toptal/picasso/utils'
import { useMutation } from '@staff-portal/data-layer-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { UpdateTopShieldApplicationQuarterInput } from '@staff-portal/graphql/staff'

import { UpdateTopShieldApplicationQuarterDocument } from '../data/update-top-shield-application-quarter'

const ERROR_MESSAGE = 'Unable to update TopShield application quarter.'
const SUCCESS_MESSAGE =
  'TopShield application quarter was successfully updated.'

interface Props {
  quarterId: string
  hideModal: () => void
}

export const useUpdateTopShieldApplicationQuarter = ({
  quarterId,
  hideModal
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const [updateTopShieldApplicationQuarter] = useMutation(
    UpdateTopShieldApplicationQuarterDocument,
    {
      onError: () => showError(ERROR_MESSAGE)
    }
  )

  const handleSubmit = async (
    values: Partial<UpdateTopShieldApplicationQuarterInput>
  ) => {
    if (!values.startDate || !values.endDate) {
      return
    }

    const { data } = await updateTopShieldApplicationQuarter({
      variables: {
        input: {
          quarterId,
          startDate: values.startDate,
          endDate: values.endDate,
          paymentEndDate: values.paymentEndDate ?? null
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.updateTopShieldApplicationQuarter,
      onSuccessAction: hideModal,
      successNotificationMessage: SUCCESS_MESSAGE
    })
  }

  return { handleSubmit }
}
