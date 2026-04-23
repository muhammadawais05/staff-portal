import { useLazyQuery } from '@staff-portal/data-layer-service'
import { QueryResult } from '@staff-portal/editable'

import {
  GetOpportunityAttributionDocument,
  GetOpportunityAttributionQuery
} from '../data/get-opportunity-attribution.staff.gql.types'

type Key = Extract<
  keyof Exclude<GetOpportunityAttributionQuery['node'], undefined | null>,
  'partner' | 'offering' | 'source' | 'event' | 'marketingCampaign'
>

export const getOpportunityValueHook =
  <DataType>(opportunityId: string, key: Key): (() => QueryResult<DataType>) =>
  () => {
    const [request, { data, loading, called, error }] = useLazyQuery(
      GetOpportunityAttributionDocument,
      {
        variables: { opportunityId }
      }
    )

    return {
      request,
      loading,
      error,
      data: (data?.node?.[key] as unknown as DataType) ?? undefined,
      called
    }
  }
