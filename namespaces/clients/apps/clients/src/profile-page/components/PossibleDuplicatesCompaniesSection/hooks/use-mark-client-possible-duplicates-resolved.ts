import { useMutation } from '@staff-portal/data-layer-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { MarkClientPossibleRoleDuplicatesResolvedDocument } from '../data/mark-client-possible-duplicates-resolved.staff.gql.types'

const useMarkClientDuplicatesResolved = ({
  clientId
}: {
  clientId?: string
}) => {
  const { handleMutationResult } = useHandleMutationResult()

  const [mutate, { loading }] = useMutation(
    MarkClientPossibleRoleDuplicatesResolvedDocument,
    {
      variables: { clientId }
    }
  )

  const markClientDuplicatesResolved = async () => {
    const { data } = await mutate()

    return handleMutationResult({
      mutationResult: data?.markClientPossibleRoleDuplicatesResolved,
      successNotificationMessage: 'Marked possible duplicates as resolved.'
    })
  }

  return { markClientDuplicatesResolved, loading }
}

export default useMarkClientDuplicatesResolved
