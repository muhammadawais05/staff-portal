import { useMemo } from 'react'
import { useLazyQuery } from '@staff-portal/data-layer-service'
import { titleize } from '@staff-portal/string'

import { GetCompanyOverviewEnterpriseAccountStatusAllowedTransactionsDocument } from '../data'

const getEnterpriseAccountStatusAllowedTransactionsHook =
  (clientId: string) => () => {
    const [request, { data, loading, called, error }] = useLazyQuery(
      GetCompanyOverviewEnterpriseAccountStatusAllowedTransactionsDocument,
      {
        variables: { clientId }
      }
    )

    const nodes = data?.node?.enterpriseAccountStatus?.allowedTransitions
    const options = useMemo(
      () =>
        nodes?.map(item => ({
          text: titleize(item, { capitalizeAllWords: false }),
          value: item
        })),
      [nodes]
    )

    return {
      request,
      loading,
      error,
      data: options,
      called
    }
  }

export default getEnterpriseAccountStatusAllowedTransactionsHook
