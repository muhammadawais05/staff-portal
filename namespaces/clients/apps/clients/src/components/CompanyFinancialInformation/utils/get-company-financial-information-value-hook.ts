import { useLazyQuery } from '@staff-portal/data-layer-service'
import { QueryResult } from '@staff-portal/editable'

import {
  GetCompanyFinancialInformationDocument,
  GetCompanyFinancialInformationQuery
} from '../data/get-company-financial-information.staff.gql.types'

type Key = Extract<
  keyof Exclude<GetCompanyFinancialInformationQuery['node'], undefined | null>,
  'stage' | 'totalFunding' | 'acquiredBy' | 'acquiredCompanies'
>

export const getCompanyFinancialInformationValueHook = <DataType>(
  clientId: string,
  key: Key
): (() => QueryResult<DataType>) => () => {
  const [request, { data, loading, called, error }] = useLazyQuery(
    GetCompanyFinancialInformationDocument,
    {
      variables: { clientId }
    }
  )

  return {
    request,
    loading,
    error,
    data: ((data?.node?.[key] as unknown) as DataType) ?? undefined,
    called
  }
}
