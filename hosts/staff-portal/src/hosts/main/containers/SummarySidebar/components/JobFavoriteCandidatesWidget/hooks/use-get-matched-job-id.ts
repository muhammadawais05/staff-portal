import { useMemo } from 'react'
import {
  useLocation,
  useRouteMatch,
  queryStringToObject
} from '@staff-portal/navigation'
import { RoutePath } from '@staff-portal/routes'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const useGetMatchedJobId = () => {
  const jobPageMatch = useRouteMatch<{ id: string }>(RoutePath.Job)
  const talentPageMatch = useRouteMatch<{}>({
    path: RoutePath.Talents,
    exact: true
  })
  const { search } = useLocation()

  return useMemo(() => {
    if (jobPageMatch) {
      return encodeEntityId(jobPageMatch.params.id, 'Job')
    }

    if (talentPageMatch) {
      const jobIdParam = queryStringToObject(search).job_id as
        | string
        | undefined

      return jobIdParam && encodeEntityId(jobIdParam, 'Job')
    }
  }, [jobPageMatch, talentPageMatch, search])
}
