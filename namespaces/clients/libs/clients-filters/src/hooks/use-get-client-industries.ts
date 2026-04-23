import { useMemo } from 'react'
import { useGetData } from '@staff-portal/data-layer-service'
import { GetClientIndustriesDocument } from '@staff-portal/clients'
import { stringListToOptions } from '@staff-portal/filters'

export const useGetClientsIndustries = () => {
  const { data, ...rest } = useGetData(
    GetClientIndustriesDocument,
    'clientIndustries'
  )()

  const clientIndustries = useMemo(() => stringListToOptions(data), [data])

  return {
    industries: clientIndustries,
    ...rest
  }
}
