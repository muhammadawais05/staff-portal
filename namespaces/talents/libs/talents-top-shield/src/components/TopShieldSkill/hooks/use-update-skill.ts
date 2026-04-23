import { useNotifications } from '@toptal/picasso/utils'
import { useMutation } from '@staff-portal/data-layer-service'
import { UpdateTopShieldApplicationSkillInput } from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { UpdateTopShieldApplicationSkillDocument } from '../data/update-top-shield-application-skill'

const ERROR_MESSAGE = 'Unable to update skill.'

export const useUpdateSkill = (topShieldApplicationId: string) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const [updateSkill, { loading: updateLoading }] = useMutation(
    UpdateTopShieldApplicationSkillDocument,
    {
      onError: () => showError(ERROR_MESSAGE)
    }
  )

  const handleChange = async (
    key: 'skill',
    values: Partial<UpdateTopShieldApplicationSkillInput>
  ) => {
    const { data } = await updateSkill({
      variables: {
        input: {
          topShieldApplicationId,
          skill: values.skill ?? null
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.updateTopShieldApplicationSkill
    })
  }

  return { handleChange, loading: updateLoading }
}
