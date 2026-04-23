import { useMemo } from 'react'
import { concatMessages, useQuery } from '@staff-portal/data-layer-service'

import { isOperationEnabled } from '../../../utils'
import { OperationType } from '../types'
import {
  makeGetLazyOperationQuery,
  GetLazyOperationVariables,
  GetLazyOperationQuery
} from '../data/get-lazy-operation'

export const useGetOperation = (
  getLazyOperationVariables: GetLazyOperationVariables
) => {
  const { nodeId, nodeType, operationName } = getLazyOperationVariables

  const getLazyOperationQuery = useMemo(
    () =>
      makeGetLazyOperationQuery({ nodeType, operationName } as OperationType),
    [nodeType, operationName]
  )

  const { data, loading, error } = useQuery<
    GetLazyOperationQuery,
    { nodeId: string }
  >(getLazyOperationQuery, {
    variables: { nodeId },
    fetchPolicy: 'network-only'
  })

  const operation = data?.node?.operations?.[operationName]

  return {
    enabled: !loading && isOperationEnabled(operation),
    error: !isOperationEnabled(operation)
      ? concatMessages(operation?.messages) || error?.message
      : null,
    loading
  }
}
