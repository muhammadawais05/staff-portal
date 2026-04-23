import { useNotifications } from '@toptal/picasso/utils'
import { useMutation } from '@staff-portal/data-layer-service'
import { UpdateTopShieldApplicationSegmentInput } from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { UpdateTopShieldApplicationSegmentDocument } from '../data/update-top-shield-application-segment'

const ERROR_MESSAGE = 'Unable to update segment.'

export const useUpdateSegment = (topShieldApplicationId: string) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const [updateSegment, { loading: updateLoading }] = useMutation(
    UpdateTopShieldApplicationSegmentDocument,
    {
      onError: () => showError(ERROR_MESSAGE)
    }
  )

  const handleChange = async (
    key: 'segment',
    values: Partial<UpdateTopShieldApplicationSegmentInput>
  ) => {
    const { data } = await updateSegment({
      variables: {
        input: {
          topShieldApplicationId,
          segment: values.segment ?? null
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.updateTopShieldApplicationSegment
    })
  }

  return { handleChange, loading: updateLoading }
}
