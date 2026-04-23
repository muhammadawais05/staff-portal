import { useCallback } from 'react'
import { PatchClientProfileInput } from '@staff-portal/graphql/staff'
import { useMutation } from '@staff-portal/data-layer-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { SystemInformationFragment } from '../data/system-information-fragment.staff.gql.types'
import { SetPatchClientSystemInformationProfileDocument } from '../data/set-patch-client-system-information.staff.gql.types'
import { adjustPatchSystemInformationValues } from './adjust-patch-system-information-values'
// import {
//   SystemInformationFragment,
//   SetPatchClientSystemInformationProfileDocument
// } from '../data'
// import { adjustPatchSystemInformationValues } from './adjust-patch-system-information-values'

type Input = PatchClientProfileInput

export const useSystemInformationMutation = (
  company: SystemInformationFragment
) => {
  const { handleMutationResult } = useHandleMutationResult()

  const { id: companyId } = company

  const [patchClientProfile] = useMutation(
    SetPatchClientSystemInformationProfileDocument
  )

  const handleChange = useCallback(
    async (key: keyof Input, values?: Partial<Input>) => {
      const prevValue = company?.[key as keyof typeof company] ?? undefined
      const newValue = values?.[key] ?? undefined

      if (newValue === prevValue) {
        // value has not changed
        return
      }

      const { data } = await patchClientProfile({
        variables: {
          input: {
            ...adjustPatchSystemInformationValues(key, values),
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
