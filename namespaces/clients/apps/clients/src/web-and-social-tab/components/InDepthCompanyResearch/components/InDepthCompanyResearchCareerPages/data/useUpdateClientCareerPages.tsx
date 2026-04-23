import { useCallback } from 'react'
import { useMutation } from '@staff-portal/data-layer-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { SetUpdateClientCareerPagesDocument , CareerPageFragment } from '../../../../../data'
import { UpdateClientCareerPagesInputType } from '../types'

export const useUpdateClientCareerPages = (clientId: string) => {
  const { handleMutationResult } = useHandleMutationResult()

  const [updateClientCareerPagesDocument] = useMutation(
    SetUpdateClientCareerPagesDocument
  )

  const handleChange = useCallback(
    async (
      key: keyof UpdateClientCareerPagesInputType,
      { careerPages = [] }: Partial<{ careerPages: CareerPageFragment[] }>
    ) => {
      const { data } = await updateClientCareerPagesDocument({
        variables: {
          input: {
            [key]: careerPages?.map(
              /*
               * We should remove __typename prop, to avoid an error on the backend.
               */
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              ({ __typename, ...rest }) => rest
            ),
            clientId
          }
        }
      })

      return handleMutationResult({
        mutationResult: data?.updateClientCareerPages,
        isFormSubmit: true
      })
    },
    [clientId, handleMutationResult, updateClientCareerPagesDocument]
  )

  return {
    handleChange
  }
}
