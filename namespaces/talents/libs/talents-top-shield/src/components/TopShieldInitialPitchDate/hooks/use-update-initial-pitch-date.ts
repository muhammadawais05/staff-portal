import { useNotifications } from '@toptal/picasso/utils'
import { useMutation } from '@staff-portal/data-layer-service'
import { UpdateTopShieldApplicationInitialPitchDateInput } from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { UpdateTopShieldApplicationInitialPitchDateDocument } from '../data/update-top-shield-application-initial-pitch-date'

const ERROR_MESSAGE = 'Unable to update initial pitch date.'

export const useUpdateInitialPitchDate = (topShieldApplicationId: string) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const [updateInitialPitchDate, { loading: updateLoading }] = useMutation(
    UpdateTopShieldApplicationInitialPitchDateDocument,
    {
      onError: () => showError(ERROR_MESSAGE)
    }
  )

  const handleChange = async (
    key: 'initialPitchDate',
    values: Partial<UpdateTopShieldApplicationInitialPitchDateInput>
  ) => {
    const { data } = await updateInitialPitchDate({
      variables: {
        input: {
          topShieldApplicationId,
          initialPitchDate: values.initialPitchDate
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.updateTopShieldApplicationInitialPitchDate
    })
  }

  return { handleChange, loading: updateLoading }
}
