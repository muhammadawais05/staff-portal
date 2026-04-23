import { useMemo } from 'react'
import {
  BaseQueryOptions,
  useLazyQuery
} from '@staff-portal/data-layer-service'
import { stringListToItems } from '@staff-portal/string'

import { GetClientBusinessModelsListDocument } from '../data'

export const getClientBusinessModelsListHook =
  (options?: BaseQueryOptions) => () => {
    const [request, { data, loading, called, error }] = useLazyQuery(
      GetClientBusinessModelsListDocument,
      options
    )

    const models = data?.clientBusinessModels || undefined
    const clientBusinessModels = useMemo(
      () => stringListToItems(models),
      [models]
    )

    return {
      request,
      loading,
      data: clientBusinessModels,
      error,
      called
    }
  }
