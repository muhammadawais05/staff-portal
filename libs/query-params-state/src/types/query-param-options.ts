import { EncodedValue } from './encoded-value'
import { QueryParams } from './query-params'

export type QueryParamOptions<
  TDecodedValue,
  TEncodedValue extends EncodedValue
> = {
  encode: (value: TDecodedValue) => TEncodedValue
  decode: (
    value: TEncodedValue,
    values: QueryParams,
    configuration: QueryParamsOptions
  ) => Promise<TDecodedValue> | TDecodedValue
  sanitize?: (value: TEncodedValue) => TEncodedValue | undefined
}

export type QueryParamsOptions<
  QP extends QueryParamOptions<any, any> = QueryParamOptions<any, any> // eslint-disable-line @typescript-eslint/no-explicit-any
> = {
  [prop: string]: QP
}
