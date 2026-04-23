import { useNotifications } from '@toptal/picasso/utils'
import { useMutation } from '@staff-portal/data-layer-service'
import { UpdateTopShieldApplicationOutreachStatusInput } from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { UpdateTopShieldApplicationOutreachStatusDocument } from '../data/update-top-shield-application-outreach-status'

const ERROR_MESSAGE = 'Unable to update outreach status.'

export const useUpdateOutreachStatus = (topShieldApplicationId: string) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const [updateOutreachStatus, { loading: updateLoading }] = useMutation(
    UpdateTopShieldApplicationOutreachStatusDocument,
    {
      onError: () => showError(ERROR_MESSAGE)
    }
  )

  const handleChange = async (
    key: 'outreachStatus',
    values: Partial<UpdateTopShieldApplicationOutreachStatusInput>
  ) => {
    const { data } = await updateOutreachStatus({
      variables: {
        input: {
          topShieldApplicationId,
          outreachStatus: values.outreachStatus ?? null
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.updateTopShieldApplicationOutreachStatus
    })
  }

  return { handleChange, loading: updateLoading }
}
