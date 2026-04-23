import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetCompanyOverviewEnterpriseAccountStatusDocument } from '../data'

const getEnterpriseAccountStatusHook = (clientId: string) => () => {
  const [request, { data, loading, called, error }] = useLazyQuery(
    GetCompanyOverviewEnterpriseAccountStatusDocument,
    {
      variables: { clientId }
    }
  )

  return {
    request,
    loading,
    error,
    data: data?.node?.enterpriseAccountStatus?.status || undefined,
    called
  }
}

export default getEnterpriseAccountStatusHook
