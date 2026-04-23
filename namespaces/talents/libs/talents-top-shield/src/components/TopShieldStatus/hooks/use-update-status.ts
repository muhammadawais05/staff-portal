import { useNotifications } from '@toptal/picasso/utils'
import { useMutation } from '@staff-portal/data-layer-service'
import { UpdateTopShieldApplicationStatusInput } from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { UpdateTopShieldApplicationStatusDocument } from '../data/update-top-shield-application-status'

const ERROR_MESSAGE = 'Unable to update status.'

export const useUpdateStatus = (topShieldApplicationId: string) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const [updateStatus, { loading: updateLoading }] = useMutation(
    UpdateTopShieldApplicationStatusDocument,
    {
      onError: () => showError(ERROR_MESSAGE)
    }
  )

  const handleChange = async (
    key: 'status',
    values: Partial<UpdateTopShieldApplicationStatusInput>
  ) => {
    if (!values.status) {
      return
    }

    const { data } = await updateStatus({
      variables: {
        input: {
          topShieldApplicationId,
          status: values.status
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.updateTopShieldApplicationStatus
    })
  }

  return { handleChange, loading: updateLoading }
}
