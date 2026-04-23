import { encodeEntityId } from '@staff-portal/data-layer-service'
import { useParams } from '@staff-portal/navigation'
import { useMemo } from 'react'

export const useGetMeetingId = () => {
  const { id } = useParams<{ id: string }>()

  return {
    meetingId: useMemo(() => encodeEntityId(id, 'Meeting'), [id])
  }
}
