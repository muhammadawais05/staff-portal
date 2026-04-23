import { useCallback } from 'react'
import { PatchClientProfileInput } from '@staff-portal/graphql/staff'
import { useMutation } from '@staff-portal/data-layer-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { SetPatchClientSocialMediaProfileDocument } from '../data'

export const useSocialMediaMutation = (
  companyId: string,
  values: Partial<Record<keyof PatchClientProfileInput, string>>
) => {
  const { handleMutationResult } = useHandleMutationResult()

  const [patchClientProfile] = useMutation(
    SetPatchClientSocialMediaProfileDocument
  )

  const handleChange = useCallback(
    async (
      key: keyof PatchClientProfileInput,
      input: Partial<PatchClientProfileInput>
    ) => {
      const prevValue = values?.[key] ?? undefined
      const value = input?.[key] ?? undefined

      if (value === prevValue) {
        // value has not changed
        return
      }

      const { data } = await patchClientProfile({
        variables: {
          input: {
            ...input,
            [key]: value || '',
            clientId: companyId
          }
        }
      })

      return handleMutationResult({
        mutationResult: data?.patchClientProfile
      })
    },
    [handleMutationResult, values, patchClientProfile, companyId]
  )

  return {
    handleChange
  }
}
