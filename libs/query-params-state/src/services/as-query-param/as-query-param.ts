import { EncodedValue, QueryParamOptions } from '../../types'

export const asQueryParam = <D, E extends EncodedValue>(
  options: QueryParamOptions<D, E>
) => options
