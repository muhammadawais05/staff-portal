import { useLocation, useHistory } from 'react-router-dom'

type InputParameters = Record<string, InputParameterTypes>
type InputParameterTypes =
  | typeof StringParam
  | typeof NumberParam
  | typeof ArrayParam

export type InputParametersDecoded<T extends InputParameters> = {
  [P in keyof T]: ReturnType<T[P]>
}

const useQueryParams = <T extends InputParameters>(
  parameters: T
): [
  InputParametersDecoded<T>,
  (newValues: Partial<InputParametersDecoded<T>>) => void
] => {
  const location = useLocation()
  const history = useHistory()
  const urlParams = new URLSearchParams(location.search)

  const values = {} as InputParametersDecoded<T>

  for (const [parameterName, val] of Object.entries(parameters)) {
    ;(values as Record<string, unknown>)[parameterName] =
      val === ArrayParam
        ? urlParams.getAll(parameterName)
        : val === NumberParam
        ? Number(urlParams.get(parameterName))
        : urlParams.get(parameterName)
  }

  const setValues = (newValues: Partial<InputParametersDecoded<T>>) => {
    for (const [parameterName, val] of Object.entries(newValues)) {
      if (!val) {
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

  return [values, setValues]
}

const StringParam: () => string = () => ''
const NumberParam: () => number = () => 0
const ArrayParam: () => string[] = () => []

export { useQueryParams, StringParam, NumberParam, ArrayParam }
