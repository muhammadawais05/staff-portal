import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetClientSecondaryIndustryDocument } from '../data'

export const getClientSecondaryIndustryHook = (clientId: string) => () => {
  const [request, { data, loading, called, error }] = useLazyQuery(
    GetClientSecondaryIndustryDocument,
    {
      variables: { clientId }
    }
  )

  return {
    request,
    loading,
    error,
    data: data?.node?.secondaryIndustry ?? undefined,
    called
  }
}
