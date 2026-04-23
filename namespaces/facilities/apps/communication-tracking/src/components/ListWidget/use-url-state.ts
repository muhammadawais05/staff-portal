import { useCallback, useMemo } from 'react'
import {
  useLocation,
  useHistory,
  queryStringToObject,
  objectToQueryString
} from '@staff-portal/navigation'

export const serialize = (filterValues: Record<string, unknown>): string =>
  objectToQueryString(filterValues, {
    arrayFormat: 'brackets',
    skipNulls: true,
    filter: (key, value) => (value === '' ? undefined : value)
  })

export const useUrlState = () => {
  const location = useLocation()
  const history = useHistory()

  const value = useMemo(() => queryStringToObject(location.search), [location])

  const setValue = useCallback(
    (newValue: Record<string, unknown>) =>
      history.push('?' + serialize(newValue)),
    [history]
  )

  return [value, setValue] as const
}
