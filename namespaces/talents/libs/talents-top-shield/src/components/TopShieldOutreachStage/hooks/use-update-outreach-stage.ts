import { useNotifications } from '@toptal/picasso/utils'
import { useMutation } from '@staff-portal/data-layer-service'
import { UpdateTopShieldApplicationOutreachStageInput } from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { UpdateTopShieldApplicationOutreachStageDocument } from '../data/update-top-shield-application-outreach-stage'

const ERROR_MESSAGE = 'Unable to update outreach stage.'

export const useUpdateOutreachStage = (topShieldApplicationId: string) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const [updateOutreachStage, { loading: updateLoading }] = useMutation(
    UpdateTopShieldApplicationOutreachStageDocument,
    {
      onError: () => showError(ERROR_MESSAGE)
    }
  )

  const handleChange = async (
    key: 'outreachStage',
    values: Partial<UpdateTopShieldApplicationOutreachStageInput>
  ) => {
    const { data } = await updateOutreachStage({
      variables: {
        input: {
          topShieldApplicationId,
          outreachStage: values.outreachStage ?? null
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.updateTopShieldApplicationOutreachStage
    })
  }

  return { handleChange, loading: updateLoading }
}
