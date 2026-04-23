import { useMemo } from 'react'
import { useParams } from '@staff-portal/navigation'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const useGetSourcingRequestIdParam = () => {
  const { id } = useParams<{ id: string }>()

  return useMemo(() => encodeEntityId(id, 'SourcingRequest'), [id])
}
