import { EncodedValue, QueryParams, QueryParamsOptions } from '../../types'

export const encode = (
  values: QueryParams,
  configuration: QueryParamsOptions = {}
): QueryParams => {
  const encodedValues = {} as Record<string, EncodedValue>

  for (const key of Object.keys(values)) {
    const queryParamConfiguration = configuration[key]

    if (queryParamConfiguration) {
      encodedValues[key] = queryParamConfiguration.encode(values[key])
    } else {
      encodedValues[key] = values[key] as EncodedValue
    }
  }

  return encodedValues
}

export const sanitize = (
  values: QueryParams,
  configuration: QueryParamsOptions = {}
) => {
  const sanitizedValues = {} as QueryParams

  // sanitize each encoded value that has configuration
  // append the rest of the encoded values as raw
  for (const [key, val] of Object.entries(values)) {
    const value = val as EncodedValue | undefined
    const queryParamConfiguration = configuration[key]

    if (value && queryParamConfiguration?.sanitize) {
      sanitizedValues[key] = queryParamConfiguration.sanitize(value)
    } else {
      sanitizedValues[key] = value
    }
  }

  return sanitizedValues
}

export const decode = async (
  values: QueryParams,
  configuration: QueryParamsOptions = {}
) => {
  const decodedValues = {} as QueryParams

  // decode each value that has configuration
  // append the rest of the values as raw
  for (const [key, val] of Object.entries(values)) {
    const value = val as EncodedValue | undefined
    const queryParamConfiguration = configuration[key]

    if (value && queryParamConfiguration) {
      decodedValues[key] = await queryParamConfiguration.decode(
        value,
        values,
        configuration
      )
    } else {
      decodedValues[key] = value
    }
  }

  return decodedValues
}
