import { useMemo } from 'react'
import { useLazyQuery } from '@staff-portal/data-layer-service'
import { stringListToOptions } from '@staff-portal/string'
import { GetClientIndustriesDocument } from '@staff-portal/clients'

export const useGetClientIndustries = () => {
  const [
    request,
    { data: { clientIndustries = undefined } = {}, loading, called, error }
  ] = useLazyQuery(GetClientIndustriesDocument)

  const data = useMemo(
    () => stringListToOptions(clientIndustries),
    [clientIndustries]
  )

  return {
    request,
    loading,
    data,
    error,
    called
  }
}
