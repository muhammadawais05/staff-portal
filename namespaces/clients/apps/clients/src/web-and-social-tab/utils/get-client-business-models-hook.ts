import { useMemo } from 'react'
import {
  BaseQueryOptions,
  useLazyQuery
} from '@staff-portal/data-layer-service'
import { stringListToItems } from '@staff-portal/string'

import { GetClientBusinessModelsDocument } from '../data'

export const getClientBusinessModelsHook =
  (clientId: string, options: BaseQueryOptions = {}) =>
  () => {
    const [request, { data, loading, called, error }] = useLazyQuery(
      GetClientBusinessModelsDocument,
      {
        variables: { clientId },
        ...options
      }
    )

    const models = data?.node?.businessModels || undefined
    const businessModels = useMemo(() => stringListToItems(models), [models])

    return {
      request,
      loading,
      data: businessModels,
      error,
      called
    }
  }
