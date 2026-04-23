export { default, useRenderLazyOperation } from './LazyOperation'
export { useGetLazyOperation } from './data/get-lazy-operation'
export { useGetOperation } from './hooks/use-get-operation'

export type {
  GetLazyOperationQuery,
  GetLazyOperationVariables
} from './data/get-lazy-operation'
export type { OperationType } from './types'
export type {
  RenderProps as LazyOperationRenderProps,
  Props as LazyOperationProps
} from './LazyOperation'
