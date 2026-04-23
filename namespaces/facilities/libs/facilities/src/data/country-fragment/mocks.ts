import { CountryFragment } from './country-fragment.staff.gql.types'

export const createCountryFragment = (
  data?: Partial<CountryFragment>
): CountryFragment => ({
  code: data?.code || 'GL',
  id: data?.id || '123',
  name: data?.name || 'Greenland',
  defaultTimeZone: data?.defaultTimeZone || {
    name: '(UTC+02:00) Europe - Berlin',
    value: 'Europe/Berlin'
  }
})
