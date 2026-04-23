import { useCallback } from 'react'
import { PatchClientProfileInput } from '@staff-portal/graphql/staff'
import { useMutation } from '@staff-portal/data-layer-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import {
  GetInDepthCompanyResearchClientFragment,
  SetPatchClientProfileDocument
} from '../data'
import { adjustPatchClientProfileValues } from './adjust-patch-client-profile-values'

export const useInDepthCompanyResearchMutation = (
  company: GetInDepthCompanyResearchClientFragment
) => {
  const { handleMutationResult } = useHandleMutationResult()

  const { id: companyId } = company

  const [patchClientProfile] = useMutation(SetPatchClientProfileDocument)

  const handleChange = useCallback(
    async (
      key: keyof PatchClientProfileInput,
      values?: Partial<PatchClientProfileInput>
    ) => {
      const prevValue = company?.[key as keyof typeof company] ?? undefined
      const value = values?.[key] ?? undefined
      const employeeCount = company?.currentEmployeeCount

      if (value === prevValue) {
        // value has not changed
        return
      }

      const input = adjustPatchClientProfileValues(
        key,
        value || '',
        employeeCount
      )

      const { data } = await patchClientProfile({
        variables: {
          input: {
            ...input,
            clientId: companyId
          }
        }
      })

      return handleMutationResult({
        mutationResult: data?.patchClientProfile
      })
    },
    [handleMutationResult, company, patchClientProfile, companyId]
  )

  return {
    handleChange
  }
}
