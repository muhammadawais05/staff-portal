// eslint-disable-next-line no-restricted-imports
import { useHistory, useLocation } from 'react-router-dom'

type PossibleParamsTypes = {
  string: string
  number: number
  'string[]': string[]
}

type PossibleKeys = keyof PossibleParamsTypes

type ReturnedParams<T> = {
  [P in keyof T]: T[P] extends PossibleKeys ? PossibleParamsTypes[T[P]] : never
}

type RequestedParams = Record<string, PossibleKeys>

const useQueryParams = <T extends RequestedParams>(
  parameters: T
): [ReturnedParams<T>, (newValues: Partial<ReturnedParams<T>>) => void] => {
  const location = useLocation()
  const history = useHistory()
  const urlParams = new URLSearchParams(location.search)
  const values = {} as Record<string, unknown>

  for (const [parameterName, val] of Object.entries(parameters)) {
    values[parameterName] =
      val === 'string[]'
        ? urlParams.getAll(parameterName)
        : val === 'number'
        ? Number(urlParams.get(parameterName))
        : urlParams.get(parameterName) || ''
  }

  // can't make ts consider `parameterName` to be always `keyof T`
  const castedValues = values as ReturnedParams<T>

  const setValues = (newValues: Partial<ReturnedParams<T>>) => {
    for (const [parameterName, val] of Object.entries(newValues)) {
      if (val !== 0 && !val) {
        urlParams.delete(parameterName)
      } else if (urlParams.has(parameterName)) {
        urlParams.set(parameterName, val as string)
      } else {
        urlParams.append(parameterName, val as string)
      }
    }

    history.replace({
      ...location,
      search: decodeURIComponent(urlParams.toString())
    })
  }

  return [castedValues, setValues]
}

export { useQueryParams }
