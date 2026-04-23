import { gql, useQuery } from '@staff-portal/data-layer-service'

import { TIME_ZONE_FRAGMENT } from '../time-zone-fragment'
import { GetAvailableTimeZonesDocument } from './get-available-timezones.staff.gql.types'

export default gql`
  query GetAvailableTimeZones {
    availableTimeZones {
      ...TimeZoneFragment
    }
  }

  ${TIME_ZONE_FRAGMENT}
`

export const useGetAvailableTimeZones = ({
  onError
}: {
  onError?: () => void
} = {}) => {
  const { data, ...restOptions } = useQuery(GetAvailableTimeZonesDocument, {
    onError,
    fetchPolicy: 'cache-first'
  })

  return {
    timezones: data?.availableTimeZones,
    ...restOptions
  }
}
