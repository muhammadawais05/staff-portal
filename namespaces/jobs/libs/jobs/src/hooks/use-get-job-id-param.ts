import { useMemo } from 'react'
import { useParams } from '@staff-portal/navigation'
import { encodeEntityId } from '@staff-portal/data-layer-service'

const useGetJobIdParam = () => {
  const { id } = useParams<{ id: string }>()

  return useMemo(() => encodeEntityId(id, 'Job'), [id])
}

export default useGetJobIdParam
