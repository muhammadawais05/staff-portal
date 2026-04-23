import { useMemo } from 'react'
import { useParams } from '@staff-portal/navigation'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const useGetClientRoleIdParam = () => {
  const { id: clientLegacyId } = useParams<{ id: string }>()

  return {
    clientLegacyId,
    clientId: useMemo(
      () => encodeEntityId(clientLegacyId, 'Client'),
      [clientLegacyId]
    )
  }
}
