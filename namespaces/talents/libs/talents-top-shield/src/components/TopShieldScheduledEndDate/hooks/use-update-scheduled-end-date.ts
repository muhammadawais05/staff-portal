import { useNotifications } from '@toptal/picasso/utils'
import { useMutation } from '@staff-portal/data-layer-service'
import { UpdateTopShieldApplicationScheduledEndDateInput } from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { UpdateTopShieldApplicationScheduledEndDateDocument } from '../data/update-top-shield-application-scheduled-end-date'

const ERROR_MESSAGE = 'Unable to update scheduled end date.'

export const useUpdateScheduledEndDate = (topShieldApplicationId: string) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const [updateScheduledEndDate, { loading: updateLoading }] = useMutation(
    UpdateTopShieldApplicationScheduledEndDateDocument,
    {
      onError: () => showError(ERROR_MESSAGE)
    }
  )

  const handleChange = async (
    key: 'scheduledEndDate',
    values: Partial<UpdateTopShieldApplicationScheduledEndDateInput>
  ) => {
    const { data } = await updateScheduledEndDate({
      variables: {
        input: {
          topShieldApplicationId,
          scheduledEndDate: values.scheduledEndDate
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.updateTopShieldApplicationScheduledEndDate
    })
  }

  return { handleChange, loading: updateLoading }
}
