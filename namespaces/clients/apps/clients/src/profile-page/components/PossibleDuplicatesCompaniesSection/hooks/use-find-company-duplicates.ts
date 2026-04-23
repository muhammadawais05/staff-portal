import { useMutation } from '@staff-portal/data-layer-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { FindPossibleClientDuplicatesDocument } from '../data/find-client-possible-duplicates.staff.gql.types'

const useFindClientDuplicates = ({ companyId }: { companyId: string }) => {
  const { handleMutationResult } = useHandleMutationResult()

  const [mutate, { loading }] = useMutation(
    FindPossibleClientDuplicatesDocument,
    {
      variables: { clientId: companyId }
    }
  )

  const findDuplicates = async () => {
    const { data } = await mutate()

    return handleMutationResult({
      mutationResult: data?.findPossibleClientDuplicates,
      successNotificationMessage: 'Duplicate search complete.'
    })
  }

  return { findDuplicates, loading }
}

export default useFindClientDuplicates
