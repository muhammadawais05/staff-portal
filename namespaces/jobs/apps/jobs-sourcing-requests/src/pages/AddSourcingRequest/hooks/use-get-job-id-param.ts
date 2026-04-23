import { useMemo } from 'react'
import { useLocation, queryStringToObject } from '@staff-portal/navigation'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const useGetJobIdParam = () => {
  const { search } = useLocation()
  const jobId = queryStringToObject(search).job_id as string

  return useMemo(() => [jobId, encodeEntityId(jobId, 'Job')], [jobId])
}
