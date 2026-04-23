import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetFinanceTeamMemberDocument } from '../data'

export const getFinanceTeamMemberHook = (clientId: string) => () => {
  const [request, { data, loading, called, error }] = useLazyQuery(
    GetFinanceTeamMemberDocument,
    {
      variables: { clientId }
    }
  )

  return {
    request,
    loading,
    error,
    data: data?.node?.financeTeamMember?.id,
    called
  }
}
