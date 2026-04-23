import { useMemo } from 'react'
import { useParams } from '@staff-portal/navigation'
import { encodeEntityId } from '@staff-portal/data-layer-service'

const useGetJobApplicationIdParam = () => {
  const { id } = useParams<{ id: string }>()

  return useMemo(() => encodeEntityId(id, 'JobApplication'), [id])
}

export default useGetJobApplicationIdParam
