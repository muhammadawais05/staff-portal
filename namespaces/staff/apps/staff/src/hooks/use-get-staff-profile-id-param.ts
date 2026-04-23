import { useMemo } from 'react'
import { useParams } from '@staff-portal/navigation'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const useGetStaffProfileIdParam = () => {
  const { id: staffProfileId } = useParams<{ id: string }>()

  return {
    staffId: useMemo(
      () => encodeEntityId(staffProfileId, 'Staff'),
      [staffProfileId]
    )
  }
}
