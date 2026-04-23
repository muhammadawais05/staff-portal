import { useMemo } from 'react'
import { useLocation, queryStringToObject } from '@staff-portal/navigation'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { getJobsPath } from '@staff-portal/routes'

export const useDecodeJobCreateParams = () => {
  const { search } = useLocation()
  const { company_id, client_id, opportunity_id, cancel_path } =
    queryStringToObject(search)

  return useMemo(
    () => ({
      roleId: company_id && encodeEntityId(company_id as string, 'Role'),
      clientId: client_id && encodeEntityId(client_id as string, 'Client'),
      opportunityId:
        opportunity_id &&
        encodeEntityId(opportunity_id as string, 'Opportunity'),
      cancelPath: (cancel_path as string | undefined) || getJobsPath()
    }),
    [company_id, client_id, opportunity_id, cancel_path]
  )
}
