import { useMemo } from 'react'
import { useLazyQuery } from '@staff-portal/data-layer-service'
import { stringListToOptions } from '@staff-portal/string'

import { GetClientStagesDocument } from '../data'

export const useGetClientStages = () => {
  const [
    request,
    { data: { clientStages = undefined } = {}, loading, called, error }
  ] = useLazyQuery(GetClientStagesDocument)

  const data = useMemo(() => stringListToOptions(clientStages), [clientStages])

  return {
    request,
    loading,
    data,
    error,
    called
  }
}
