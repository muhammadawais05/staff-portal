import { useLazyQuery } from '@staff-portal/data-layer-service'
import { QueryResult } from '@staff-portal/editable'

import {
  GetOpportunityDetailsDocument,
  GetOpportunityDetailsQuery
} from '../data/get-opportunity-details.staff.gql.types'

type Key = Extract<
  keyof Exclude<GetOpportunityDetailsQuery['node'], undefined | null>,
  | 'name'
  | 'description'
  | 'budget'
  | 'poAmount'
  | 'poNumber'
  | 'contractUrl'
  | 'workType'
  | 'probability'
  | 'highPriority'
  | 'highPriorityReason'
  | 'value'
>

export const getOpportunityValueHook =
  <DataType>(opportunityId: string, key: Key): (() => QueryResult<DataType>) =>
  () => {
    const [request, { data, loading, called, error }] = useLazyQuery(
      GetOpportunityDetailsDocument,
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
