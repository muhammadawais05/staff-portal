import { useNotifications } from '@toptal/picasso/utils'
import { useMutation } from '@staff-portal/data-layer-service'
import { UpdateTopShieldApplicationStartDateInput } from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { UpdateTopShieldApplicationStartDateDocument } from '../data/update-top-shield-application-start-date'

const ERROR_MESSAGE = 'Unable to update start date.'

export const useUpdateStartDate = (topShieldApplicationId: string) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const [updateStartDate, { loading: updateLoading }] = useMutation(
    UpdateTopShieldApplicationStartDateDocument,
    {
      onError: () => showError(ERROR_MESSAGE)
    }
  )

  const handleChange = async (
    key: 'startDate',
    values: Partial<UpdateTopShieldApplicationStartDateInput>
  ) => {
    const { data } = await updateStartDate({
      variables: {
        input: {
          topShieldApplicationId,
          startDate: values.startDate
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.updateTopShieldApplicationStartDate
    })
  }

  return { handleChange, loading: updateLoading }
}
