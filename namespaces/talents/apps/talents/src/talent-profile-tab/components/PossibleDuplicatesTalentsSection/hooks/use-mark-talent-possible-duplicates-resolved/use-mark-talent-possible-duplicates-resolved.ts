import { useMutation } from '@staff-portal/data-layer-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { ResolvePossibleDuplicatesDocument } from '../../data/resolve-possible-duplicates'

const useMarkTalentPossibleDuplicatesResolved = (talentId?: string) => {
  const { handleMutationResult } = useHandleMutationResult()

  const [mutate, { loading }] = useMutation(ResolvePossibleDuplicatesDocument, {
    variables: { talentId }
  })

  const resolvePossibleDuplicates = async () => {
    const { data } = await mutate()

    return handleMutationResult({
      mutationResult: data?.markTalentPossibleRoleDuplicatesResolved,
      successNotificationMessage: 'Marked possible duplicates as resolved.'
    })
  }

  return { resolvePossibleDuplicates, loading }
}

export default useMarkTalentPossibleDuplicatesResolved
