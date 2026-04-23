import { useNotifications } from '@toptal/picasso/utils'
import { useMutation } from '@staff-portal/data-layer-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { CreateTopShieldApplicationQuarterInput } from '@staff-portal/graphql/staff'

import { CreateTopShieldApplicationQuarterDocument } from '../data/create-top-shield-application-quarter'

const ERROR_MESSAGE = 'Unable to create TopShield application quarter.'
const SUCCESS_MESSAGE =
  'TopShield application quarter was successfully created.'

interface Props {
  topShieldApplicationId: string
  hideModal: () => void
}

export const useCreateTopShieldApplicationQuarter = ({
  topShieldApplicationId,
  hideModal
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const [createTopShieldApplicationQuarter, { loading: updateLoading }] =
    useMutation(CreateTopShieldApplicationQuarterDocument, {
      onError: () => showError(ERROR_MESSAGE)
    })

  const handleSubmit = async (
    values: Partial<CreateTopShieldApplicationQuarterInput>
  ) => {
    if (!values.startDate || !values.endDate) {
      return
    }

    const { data } = await createTopShieldApplicationQuarter({
      variables: {
        input: {
          topShieldApplicationId,
          startDate: values.startDate,
          endDate: values.endDate,
          paymentEndDate: values.paymentEndDate ?? null
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.createTopShieldApplicationQuarter,
      onSuccessAction: hideModal,
      successNotificationMessage: SUCCESS_MESSAGE
    })
  }

  return { handleSubmit, loading: updateLoading }
}
