import { useLazyQuery } from '@staff-portal/data-layer-service'
import { GetAvailableTimeZonesDocument } from '@staff-portal/date-time-utils'

export const useGetAvailableTimezonesLazy = () => {
  const [fetch, { data, loading }] = useLazyQuery(
    GetAvailableTimeZonesDocument,
    { fetchPolicy: 'cache-first', throwOnError: true }
  )

  return { fetch, data, loading }
}
