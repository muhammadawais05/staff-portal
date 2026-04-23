import { useCallback } from 'react'
import { UpdateOpportunityInput } from '@staff-portal/graphql/staff'
import { useMutation } from '@staff-portal/data-layer-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import {
  SetUpdateOpportunityDocument,
  OpportunityDetailsFragment
} from '../data'
import { adjustUpdateOpportunityValues } from './adjust-values/adjust-update-opportunity-values'

export const useOpportunityDetailsMutation = (
  opportunity: OpportunityDetailsFragment
) => {
  const { handleMutationResult } = useHandleMutationResult()

  const { id: opportunityId } = opportunity

  const [updateOpportunity] = useMutation(SetUpdateOpportunityDocument)

  const handleChange = useCallback(
    async (
      key: keyof UpdateOpportunityInput,
      values?: Partial<UpdateOpportunityInput>
    ) => {
      const prevValue =
        opportunity?.[key as keyof typeof opportunity] ?? undefined
      const value = values?.[key] ?? undefined

      if (value === prevValue) {
        // value has not changed
        return
      }

      const input = adjustUpdateOpportunityValues(key, value || '')

      const { data } = await updateOpportunity({
        variables: {
          input: {
            ...input,
            opportunityId
          }
        }
      })

      return handleMutationResult({
        mutationResult: data?.updateOpportunity
      })
    },
    [handleMutationResult, opportunity, updateOpportunity, opportunityId]
  )

  return {
    handleChange
  }
}
