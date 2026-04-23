import { useQuery, BATCH_KEY } from '@staff-portal/data-layer-service'
import { STATUS_MESSAGES_BATCH_KEY } from '@staff-portal/status-messages'

import { GetPossibleDuplicatesDocument } from '../../data/get-possible-duplicates'

const useGetPossibleDuplicates = ({
  talentId,
  onError
}: {
  talentId: string
  onError?: () => void
}) => {
  const { data, loading, called } = useQuery(GetPossibleDuplicatesDocument, {
    onError,
    variables: { talentId },
    throwOnError: true,
    context: { [BATCH_KEY]: STATUS_MESSAGES_BATCH_KEY }
  })

  return { data: data?.node, loading, called }
}

export default useGetPossibleDuplicates
